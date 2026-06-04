import React, { useEffect, useState } from 'react'
import { Input, Table, Tag, Button } from 'antd'
import { SearchOutlined, DeleteOutlined } from '@ant-design/icons'
import {
  useGetAllUsersQuery,
  useDeleteUserMutation,
} from '../../store/users/usersApi'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router'
const AdminPage = () => {
  const [searchText, setSearchText] = useState('')
  const [deleteUser, { error }] = useDeleteUserMutation()
  const { data: users = [], isLoading } = useGetAllUsersQuery()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const handleDelete = (target) => {
    dispatch(deleteUser(target.id))
  }
  console.log(error)

  const filteredData = users.filter(
    (user) =>
      user.username.toLowerCase().includes(searchText.toLowerCase()) ||
      user.email.toLowerCase().includes(searchText.toLowerCase())
  )
  const columns = [
    {
      title: 'Пользователь',
      dataIndex: 'username',
      key: 'username',
      sorter: (a, b) => a.username.localeCompare(b.username),
      render: (text) => (
        <span className="font-medium text-slate-900">@{text}</span>
      ),
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Роль',
      dataIndex: 'role',
      key: 'role',
      filters: [
        { text: 'User', value: 'User' },
        { text: 'Doctor', value: 'Doctor' },
        { text: 'Admin', value: 'Admin' },
      ],
      onFilter: (value, record) => record.role === value,
      render: (role) => {
        let color = 'default'
        if (role === 'Admin') color = 'gold'
        if (role === 'Doctor') color = 'blue'
        return (
          <Tag color={color} className="rounded px-2 py-0.5 font-medium">
            {role}
          </Tag>
        )
      },
    },
    {
      title: 'Действия',
      key: 'action',
      align: 'right',
      render: (_, record) => (
        <Button
          type="text"
          danger
          disabled={record.role === 'Admin'} // Нельзя удалить админа
          icon={<DeleteOutlined />}
          onClick={() => handleDelete(record)}
          className="hover:bg-rose-50 rounded-lg transition-colors"
        >
          Удалить
        </Button>
      ),
    },
  ]
  return (
    <div className="max-w-6xl mx-auto px-4 py-8 text-[#1E293B]">
      {/* Заголовок и счётчик в стиле News Portal */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <button
          onClick={() => navigate('/')}
          className="cursor-pointer bg-slate-100 text-slate-700 text-xs font-semibold px-3 py-1.5 rounded-lg self-start sm:self-center"
        >
          <span>← Назад</span>
        </button>
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-[#0F172A]">
            Управление пользователями
          </h1>
          <p className="text-slate-500 text-sm mt-0.5">
            Просмотр списка зарегистрированных аккаунтов, фильтрация и удаление.
          </p>
        </div>
        <div className="bg-slate-100 text-slate-700 text-xs font-semibold px-3 py-1.5 rounded-lg self-start sm:self-center">
          Всего: {users.length}
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-100 p-4 mb-6 shadow-sm">
        <Input
          placeholder="Поиск по имени или email..."
          prefix={<SearchOutlined className="text-slate-400 mr-1" />}
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="max-w-md h-10 rounded-lg"
          allowClear
        />
      </div>

      {/* Сама таблица Antd */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden p-2">
        <Table
          columns={columns}
          dataSource={filteredData}
          pagination={{
            pageSize: 10,
            showSizeChanger: false,
            className: 'px-4',
          }}
          loading={isLoading}
          locale={{ emptyText: 'Пользователи не найдены' }}
        />
      </div>
    </div>
  )
}

export default AdminPage
