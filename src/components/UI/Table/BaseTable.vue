<template>
  <table class="table">
    <thead class="table__head"
        :style="{'grid-template-columns': columnTemplates}">
    <tr class="table__name"
        v-for="(element, i) of head"
        :key="i"
        @click="clickOnHead(element)">
      <td>{{ element }}</td>
    </tr>
    </thead>
    <slot></slot>
  </table>
</template>

<script setup lang="ts">
interface Props {
  head?: string[]
  columnTemplates?: string
}

defineProps<Props>()

const emit = defineEmits(['sorting'])

const clickOnHead = (name: string): void => {
  emit('sorting', name.toLowerCase())
}
</script>


<style lang="scss" scoped>
.table {
  background-color: #fff;
  width: 100%;

  &__head {
    display: grid;
    column-gap: 10px;
    align-items: center;
    border-bottom: 1px solid #EAECF0;
    background: #F9FAFB;
  }

  &__name {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 12px 24px;
    color: #667085;
    font-size: 12px;
    font-style: normal;
    font-weight: 500;
    line-height: 18px;
    cursor: pointer;
  }
}
</style>
