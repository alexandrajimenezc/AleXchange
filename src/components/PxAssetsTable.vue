<template>
  <table>
    <thead class="text-yellow-800 ">
      <tr class="  bg-red-200 border-b-2 border-red-400">
        <th class="rounded-tl-lg  "></th>
        <th :class="{ up: this.sortOrder === 1, down: this.sortOrder === -1 }">
          <span class="underline cursor-pointer" @click="changeSortOrder"
            >Ranking</span
          >
        </th>
        <th>Nombre</th>
        <th>Precio</th>
        <th>Cap. de Mercado</th>
        <th>Variación 24hs</th>
        <td class=" hidden sm:block ">
          <input
            class=" rounded bg-red-100 focus:outline-none border-b border-red-400 py-2 px-4 block w-full appearance-none leading-normal"
            id="filter"
            placeholder="Buscar..."
            type="text"
            v-model="filter"
          />
        </td>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="a in filteredAssets"
        v-bind:key="a.id"
        class="border-b border-red-200 hover:bg-red-100 hover:bg-red-100 text-yellow-900"
      >
        <td>
          <img
            class="w-6 h-6"
            v-bind:src="
              `https://static.coincap.io/assets/icons/${a.symbol.toLowerCase()}@2x.png`
            "
            v-bind:alt="a.name"
          />
        </td>
        <td class="text-yellow-800">
          <b>#{{ a.rank }}</b>
        </td>
        <td>
          <router-link
            class="hover:underline text-red-600"
            v-bind:to="{ name: 'coin-detail', params: { id: a.id } }"
          >
            {{ a.name }}
          </router-link>
          <small class="ml-1 text-gray-500 ">
            {{ a.symbol }}
          </small>
        </td>
        <td>{{ a.priceUsd | dollar }}</td>
        <td>{{ a.marketCapUsd | dollar }}</td>
        <td
          v-bind:class="
            a.changePercent24Hr.includes('-')
              ? 'text-red-600'
              : 'text-green-600'
          "
        >
          {{ a.changePercent24Hr | percent }}
        </td>
        <td class="hidden sm:block">
          <px-button @custom-click="goToCoin(a.id)">
            <span>Detalle</span>
          </px-button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import PxButton from '@/components/PxButton'

export default {
  name: 'PxAssetsTable',
  components: { PxButton },

  data() {
    return {
      filter: '',
      sortOrder: 1
    }
  },

  props: {
    assets: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    /* 

    esta condición ya no es necesario pq el filter como el sort se van a encargar de funcionar si asset no tiene elementos
    
      if (!this.filter) {
        return this.assets
      }
 */

    filteredAssets() {
      const altOrder = this.sortOrder === 1 ? -1 : 1
      return this.assets
        .filter(
          a =>
            a.symbol.toLowerCase().includes(this.filter.toLowerCase()) ||
            a.name.toLowerCase().includes(this.filter.toLowerCase())
        )
        .sort((a, b) => {
          if (parseInt(a.rank) > parseInt(b.rank)) {
            return this.sortOrder
          }
          return altOrder
        })
    }
  },
  methods: {
    goToCoin(id) {
      this.$router.push({ name: 'coin-detail', params: { id } })
    },
    changeSortOrder() {
      this.sortOrder = this.sortOrder === 1 ? -1 : 1
    }

    //manejando el px-button
    //paso el valor dinamico id en el template
    // goToCoin(id) {
    //perminte acceder a la instancia del router
    // y poder usarlo para navegar a traves del codigo
    //la menera de navegar es pusheando la ruta
    //para pushear uso la misma sintaxis que en el router link
    // this.$router.push({ name: 'coin-detail', params: { id } })
    //}
  }
}
</script>

<style scoped>
.up::before {
  content: '👆';
}

.down::before {
  content: '👇';
}

td {
  padding: 20px 0px;
  font-size: 0.6rem;
  text-align: center;
}

th {
  padding: 5px;
  font-size: 0.6rem;
}

@media (min-width: 640px) {
  td,
  th {
    padding: 20px;
    font-size: 1rem;
  }

  th {
    padding: 12px;
  }
}
</style>
