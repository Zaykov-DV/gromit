<script setup lang="ts">
import {ref, computed, watchEffect} from 'vue'
import BaseTable from '@/components/UI/Table/BaseTable.vue'
import TableRow from '@/components/UI/Table/TableRow.vue'
import TableColumn from '@/components/UI/Table/TableColumn.vue'
import Loading from '@/components/UI/Loading.vue'
import Popup from '@/components/UI/Popup.vue'
import Card from "@/components/Card.vue";

const tableHeads: string[] = ['Id', 'Name', 'Status', 'Species', 'Gender', 'Origin', 'Location', 'Created']
const tableSizeColumns: string = '50px 2fr 1fr 1fr 1fr 2fr 2fr 1fr'

const loading = ref<boolean>(false)
const data = ref<ApiResponse | {}>({});

// Sorting
const currentSort = ref<string>('date')
const currentSortDir = ref<string>('asc')

const tableSorting = computed(() => {
  return data.value.results.sort((a: string, b: string) => {
    let modifier = 1;
    if (currentSortDir.value === 'desc') modifier = -1;
    if (a[currentSort.value] < b[currentSort.value]) return -1 * modifier;
    if (a[currentSort.value] > b[currentSort.value]) return 1 * modifier;
    return 0;
  })
})

const setSort = (sortKey: string) => {
  if (sortKey === currentSort.value) {
    currentSortDir.value = currentSortDir.value === 'asc' ? 'desc' : 'asc';
  }
  currentSort.value = sortKey;
}

// Popup
const popupTriggers = ref({
  tableRowTrigger: false,
})

const togglePopup = (trigger: any) => {
  popupTriggers.value[trigger] = !popupTriggers.value[trigger]
}

interface Results {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: {
    name: string;
    url: string;
  };
  location: {
    name: string;
    url: string;
  };
  image: string;
  episode: string[];
  url: string;
  created: Date;
}

interface ApiResponse {
  info: {
    count: number;
    pages: number;
    next: string;
    prev: string;
  };
  results: [Results];
}

const page = ref<number>(1);

watchEffect(async () => {
  loading.value = true
  await fetch(`https://rickandmortyapi.com/api/character?page=${page.value}`)
      .then((response) => response.json())
      .then((json) => data.value = json)
      .then(() => setTimeout(() => {
        loading.value = false
      }, 1000))
})

const chosenCharacter = ref<Results | {}>({})
const openInfo = async (id: string) => {
  await fetch(`https://rickandmortyapi.com/api/character/${id}`)
      .then((response) => response.json())
      .then((json) => chosenCharacter.value = json)
      .then(() => {
        togglePopup('tableRowTrigger')
      })
}

</script>

<template>
  <h1>Rick and Morty Characters</h1>

  <main class="main">
    <BaseTable class="main__table" :head="tableHeads" :columnTemplates="tableSizeColumns" @sorting="setSort">
      <Loading v-if="loading"/>
      <div class="main__table-info" v-else>
        <TableRow v-for="character in tableSorting" :key="character.id" :columnTemplates="tableSizeColumns" @click="openInfo(character.id)">
          <TableColumn>
            {{ character.id }}
          </TableColumn>
          <TableColumn>
            {{ character.name }}
          </TableColumn>
          <TableColumn>
            {{ character.status }}
          </TableColumn>
          <TableColumn>
            {{ character.species }}
          </TableColumn>
          <TableColumn>
            {{ character.gender }}
          </TableColumn>
          <TableColumn>
            {{ character.origin.name }}
          </TableColumn>
          <TableColumn>
            {{ character.location.name }}
          </TableColumn>
          <TableColumn>
            {{ new Date(character.created).toLocaleString('en-EU', {year: 'numeric', month: 'long', day: 'numeric'}) }}
          </TableColumn>
        </TableRow>
      </div>
    </BaseTable>
    <div class="main__buttons">
      <button class="main__button" @click="page--" v-if="data?.info.prev">Prev</button>
      <button @click="page++" v-if="data?.info.next">Next</button>
    </div>
  </main>
  <Popup v-if="popupTriggers.tableRowTrigger"
         :togglePopup="() => togglePopup('tableRowTrigger')">
    <Card :character="chosenCharacter"/>
  </Popup>
</template>

<style lang="scss">
.main {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;

  &__table {
    flex: 1;
    margin-bottom: 40px;
  }

  &__table-info {
    min-height: 1200px;
  }

  &__buttons {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &__button {
    margin-right: 20px;
  }


}
</style>
