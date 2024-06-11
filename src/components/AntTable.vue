<script lang="ts" setup>
// import { TableState, TableStateFilters } from 'ant-design-vue/es/table/interface'
import { usePagination } from 'vue-request'
import { computed } from 'vue'
import axios from 'axios'

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    sorter: true,
    width: '20%',
    slots: { customRender: 'name' }
  },
  {
    title: 'Gender',
    dataIndex: 'gender',
    filters: [
      { text: 'Male', value: 'male' },
      { text: 'Female', value: 'female' }
    ],
    width: '20%'
  },
  {
    title: 'Email',
    dataIndex: 'email'
  }
]

// type Pagination = TableState['pagination']
type APIParams = {
  results: number
  page?: number
  sortField?: string
  sortOrder?: number
  [key: string]: any
}
type APIResult = {
  results: {
    gender: 'female' | 'male'
    name: string
    email: string
  }[]
}

const queryData = (params: APIParams) => {
  const queryStr = `https://randomuser.me/api?noinfo&${new URLSearchParams(params)}`
  return axios.get<APIResult>(queryStr).then((res) => res.data.results)
}

const {
  data: dataSource,
  run,
  loading,
  current,
  pageSize
} = usePagination<APIResult['results']>(queryData, {
  pagination: {
    currentKey: 'page',
    pageSizeKey: 'results'
  }
})
const pagination = computed(() => ({
  total: 200,
  current: current.value,
  pageSize: pageSize.value
}))

const handleTableChange = (pag: any, filters: any, sorter: any) => {
  run({
    results: pag!.pageSize!,
    page: pag?.current,
    sortField: sorter.field,
    sortOrder: sorter.order,
    ...filters
  })
}
</script>

<template>
  <section class="container px-6">
    <a-table
      :columns="columns"
      :row-key="(_record: any, idx: any) => idx"
      :data-source="dataSource"
      :pagination="pagination"
      :loading="loading"
      @change="handleTableChange"
    >
      <!-- name col -->
      <template #name="{ text }">{{ text.first }} {{ text.last }}</template>
    </a-table>
  </section>
</template>
