import { DataManager, CustomDataAdaptor } from '@syncfusion/ej2-data'

export function getContactsDataManager(accessToken, actor) {
  const apiUrl = `${window.config.apiUrl}/contacts`
  const headers = {
    'Content-Type': 'application/json',
    actor: actor,
    Authorization: `Bearer ${accessToken}`
  }
  return new DataManager({
    adaptor: new CustomDataAdaptor({
      updateRecord: function (option) {
        console.log('updateRecord', option)
        option.onSuccess({}, {})
      },
      addRecord: function (option) {
        const data = JSON.parse(option.data)
        console.log('addRecord', data)
        var request = option || {}
        fetch(apiUrl, {
          method: 'POST',
          headers: headers,
          body: JSON.stringify(data.value)
        })
          .then((response) => {
            request.httpRequest = response
            if (response.status >= 200 && response.status <= 299) {
              return response.json()
            }
          })
          .then((data) => {
            option.onSuccess(data, request)
          })
          .catch((error) => {
            option.onFailure(request)
          })
      },
      deleteRecord: function (option) {
        console.log('deleteRecord', option)
        option.onSuccess({}, {})
      },
      batchUpdate: function (option) {
        console.log('batchUpdate', option)
        option.onSuccess({}, {})
      },
      getData: function (option) {
        var request = option || {}
        fetch(apiUrl, {
          method: 'GET',
          headers: headers
        })
          .then((response) => {
            request.httpRequest = response
            if (response.status >= 200 && response.status <= 299) {
              return response.json()
            }
          })
          .then((data) => {
            option.onSuccess(data, request)
          })
          .catch((error) => {
            option.onFailure(request)
          })
      }
    })
  })
}
