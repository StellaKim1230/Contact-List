import contactAPI from '../api/ContactsAPI'
import Constant from '../constant'

export default {
  [Constant.ADD_CONTACT_FORM] : (store) => {
    store.commit(Constant.ADD_CONTACT_FORM)
  },
  [Constant.ADD_CONTACT] : (store) => {
    contactAPI.addContact(store.state.contact)
    .then((response) => {
      if (response.data.status === 'success') {
        store.dispatch(Constant.CANCEL_FORM)
        store.dispatch(Constant.FETCH_CONTACTS, { pageno: 1 })
      } else {
        console.log('연락처 추가 실패 : '+ response.data)
      }
    })
  },
  [Constant.EDIT_CONTACT_FORM] : (store, payload) => {
    contactAPI.fetchContactOne(payload.no)
    .then((response) => {
      store.commit(Constant.EDIT_CONTACT_FORM, { contact: response.data })
    })
  },
  [Constant.UPDATE_CONTACT] : (store) => {
    var currentPageNo = store.state.contactlist.pageno
    contactAPI.updateContact(store.state.contact)
    .then((response) => {
      if (response.data.status === 'success') {
        store.dispatch(Constant.CANCEL_FORM)
        store.dispatch(Constant.FETCH_CONTACTS, { pageno: currentPageNo })
      } else {
        console.log('연락처 변경 실패 : '+ response.data)
      }
    })
  },
  [Constant.EDIT_PHOTO_FORM] : (store, payload) => {
    contactAPI.fetchContactOne(payload.no)
    .then((response) => {
      store.commit(Constant.EDIT_PHOTO_FORM, { contact: response.data })
    })
  },
  [Constant.UPDATE_PHOTO] : (store, payload) => {
    var currentPageNo = store.state.contactlist.pageno;
    contactAPI.updatePhoto(payload.no, payload.file)
    .then((response) => {
      store.dispatch(Constant.CANCEL_FORM)
      store.dispatch(Constant.FETCH_CONTACTS, { pageno: currentPageNo })
    })
  },
  [Constant.FETCH_CONTACTS] : (store, payload) => {
    console.log(store)
    var pageno;
    if (typeof payload === 'undefined' || typeof payload.pageno === 'undefined') {
      pageno = 1;
    } else {
      pageno = payload.pageno;
      var pagesize = store.contactlist.pagesize
    }

    contactAPI.fetchContacts(pageno, pagesize)
    .then((response) => {
      store.commit(Constant.FETCH_CONTACTS, { contactlist: response.data })
    })
  },
  [Constant.CANCEL_FORM] : (store, payload) => {
    store.commit(Constant.CANCEL_FORM)
  },
  [Constant.DELETE_CONTACT] : (store, payload) => {
    var currentPageNo = store.state.contactlist.pageno
    contactAPI.deleteContact(payload.no)
    .then((response) => {
      store.dispatch(Constant.FETCH_CONTACTS, { pageno: currentPageNo })
    })
  },
  [Constant.CHANGE_MODE] : (store, payload) => {
    store.commit(Constant.CHANGE_MODE, { mode: payload.mode })
  }
}