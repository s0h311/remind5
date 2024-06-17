<template>
  <div>
    <h1 class="text-xl">Subscription Overview</h1>

    <table
      v-if="subscription"
      class="table w-fit"
    >
      <tr>
        <th>type</th>
        <td>{{ subscription.type.toUpperCase() }}</td>
      </tr>

      <tr>
        <th>since</th>
        <td>
          {{ formatDate(new Date(subscription.createdAt)) }}
        </td>
      </tr>

      <tr>
        <th>payment period</th>
        <td>{{ subscription.paymentPeriod }}</td>
      </tr>

      <tr>
        <th>last payment</th>
        <td>
          {{ subscription.lastPayment ? formatDate(new Date(subscription.lastPayment)) : '-' }}
        </td>
      </tr>
    </table>

    <div v-else>Free subscription</div>
  </div>
</template>

<script setup lang="ts">
const subscription = await useSubscription()
</script>

<style scoped>
th {
  @apply pl-0 pt-0;
}

td {
  @apply pr-0 pt-0;
}

table tr:last-child {
  th,
  td {
    @apply pb-0;
  }
}
</style>
