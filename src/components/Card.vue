<script setup lang="ts">
const props = defineProps(['character'])
</script>

<template>
  <div class="card">
    <img :src="character.image"/>
    <div class="card__info">
      <h3> {{ character.name }}</h3>
      <div class="card__status"><span class="card__status-icon"
                                      :class="{'is-alive': character.status === 'Alive',
                                               'is-unknown' : character.status === 'unknown',
                                                'is-dead': character.status ==='Dead'}">
      </span>
        <p>{{ character.status }} - {{ character.species }}</p>
      </div>
      <p>Gender: {{ character.gender }}</p>
      <p>From: {{ character.origin.name }}</p>
      <div>
        <p>Last known location:</p>
        <p>{{ character.location.name }}</p>
      </div>
      <p>Created {{ new Date(character.created).toLocaleString('en-EU', {year: 'numeric', month: 'long', day: 'numeric'}) }}</p>
    </div>
  </div>

</template>

<style scoped lang="scss">
.card {
  display: flex;

  &__info {
    margin-left: 20px;
    text-align: left;
  }

  &__status {
    display: flex;
    align-items: center;
  }

  &__status-icon {
    display: inline-block;
    height: 6px;
    width: 6px;
    margin-right: 4px;
    border-radius: 50%;
    &.is-alive {
      background: rgb(85, 204, 68);
    }
    &.is-unknown {
      background: rgba(255, 165, 0);
    }
    &.is-dead {
      background: rgb(173, 49, 49);
    }
  }
}
</style>
