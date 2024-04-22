import React from 'react'
import {
  GridComponent,
  ColumnsDirective,
  ColumnDirective,
  Page,
  Selection,
  Inject,
  Edit,
  Toolbar,
  Sort,
  Filter
} from '@syncfusion/ej2-react-grids'

import { useStateContext } from '../contexts/ContextProvider'

// import { customersData, customersGrid } from '../data/dummy'
import { Header } from '../components'
import { getContactsDataManager } from '../adaptors/ContactsAdaptor'

const customerGridImage = (props) => (
  <div className="image flex gap-4">
    {/* <img
      className="rounded-full w-10 h-10"
      src={props.CustomerImage}
      alt="employee"
    /> */}
    <div>
      <p>{props.name}</p>
      <p>{props.email}</p>
    </div>
  </div>
)

const customerGridStatus = (props) => (
  <div className="flex gap-2 justify-center items-center text-gray-700 capitalize">
    <p
      style={{ background: props.StatusBg }}
      className="rounded-full h-3 w-3"
    />
    <p>{props.Status}</p>
  </div>
)

const customersGrid = [
  { type: 'checkbox', width: '50' },
  {
    field: 'id',
    headerText: 'ID',
    width: '30',
    textAlign: 'Center',
    isPrimaryKey: true
  },
  {
    headerText: 'Name',
    width: '150',
    field: 'name',
    // template: customerGridImage,
    textAlign: 'Center'
  },
  {
    field: 'email',
    headerText: 'Email',
    width: '180',
    textAlign: 'Center'
  }
]

const Contacts = () => {
  const selectionsettings = { persistSelection: true }
  const { user, accessToken } = useStateContext()
  const data = getContactsDataManager(accessToken, user.email)

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header category="Page" title="Contacts" />
      <GridComponent
        dataSource={data}
        enableHover={false}
        allowPaging
        pageSettings={{ pageCount: 5 }}
        selectionSettings={selectionsettings}
        editSettings={{
          allowEditing: true,
          allowAdding: true,
          allowDeleting: true
        }}
        toolbar={['Add', 'Delete', 'Update', 'Cancel']}
      >
        <ColumnsDirective>
          {/* eslint-disable-next-line react/jsx-props-no-spreading */}
          {customersGrid.map((item, index) => (
            <ColumnDirective key={index} {...item} />
          ))}
        </ColumnsDirective>
        <Inject services={[Page, Selection, Toolbar, Edit]} />
      </GridComponent>
    </div>
  )
}

export default Contacts
