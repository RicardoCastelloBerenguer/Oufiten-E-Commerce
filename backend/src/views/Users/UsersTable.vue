<template>
    <div class="bg-white p-4 rounded-lg shadow animate-fade-in-down">
        <div class="flex justify-between border-b-2 pb-3">
            <div class="flex items-center">
                <span class="whitespace-nowrap mr-3">Por página</span>
                <select @change="getUsers(null)" v-model="perPage"
                        class="appaerance-none relative block w-24 px-3 py-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">">
                    <option selected value="5" >5</option>
                    <option value="10">10</option>
                    <option value="20">20</option>
                    <option value="30">30</option>
                    <option value="50">50</option>
                </select>
            </div>
            <div>
                <input v-model="search" @change="getUsers(null)"
                       placeholder="Búsqueda..."
                       class=" border-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            </div>
        </div>
        <LoadingSpiner v-if="users.loading" class="mt-8 justify-center"/>
        <template v-else>
            <table class="table-auto w-full">
                <thead>
                <tr>
                    <TableHead @orderProductsBy="sortUsers" field="id" :order="order" :sortBy="sortBy">Id</TableHead>
                    <TableHead @orderProductsBy="sortUsers" field="name" :order="order" :sortBy="sortBy">Nombre de usuario</TableHead>
                    <TableHead @orderProductsBy="sortUsers" field="email" :order="order" :sortBy="sortBy">Email</TableHead>
                    <TableHead @orderProductsBy="sortUsers" field="created_at" :order="order" :sortBy="sortBy">Fecha de creación</TableHead>
                    <TableHead :order="order" :sortBy="sortBy" field=""> Acciones </TableHead>
                </tr>
                </thead>
                <tbody>
                <!--class="animate-fade-in-down"!-->
                <tr v-for="(user,index) of users.data"  :style="{'animation-delay': `${index*0.1}s`}">
                    <td class="border-b p-2">{{user.id}}</td>
                    <td class="border-b p-2 max-w-[250px] whitespace-nowrap overflow-hidden text-ellipsis">{{ user.name }}</td>
                    <td class="border-b p-2">{{user.email}}</td>
                    <td class="border-b p-2">{{user.created_at}}</td>
                    <td class="border-b p-2">
                        <Menu as="div" class="relative inline-block text-left">
                            <div>
                                <div>
                                    <MenuButton
                                        class="inline-flex items-center justify-center w-full justify-center rounded-full w-10 h-10 bg-black bg-opacity-0 text-sm font-medium text-white hover:bg-opacity-5 focus:bg-opacity-5 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
                                    >
                                        <EllipsisVerticalIcon
                                            class="h-5 w-5 text-indigo-500"
                                            aria-hidden="true"/>
                                    </MenuButton>
                                </div>
                            </div>

                            <transition
                                enter-active-class="transition duration-100 ease-out"
                                enter-from-class="transform scale-95 opacity-0"
                                enter-to-class="transform scale-100 opacity-100"
                                leave-active-class="transition duration-75 ease-in"
                                leave-from-class="transform scale-100 opacity-100"
                                leave-to-class="transform scale-95 opacity-0"
                            >
                                <MenuItems
                                    class="absolute right-0 mt-2 w-32 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                                >
                                    <div class="px-1 py-1">
                                        <MenuItem v-slot="{ active }">
                                            <button
                                                :class="[
                        active ? 'bg-indigo-600 text-white' : 'text-gray-900',
                        'group flex w-full items-center rounded-md px-2 py-2 text-sm',
                      ]"
                                                @click="editUser(user)"
                                            >
                                                <PencilSquareIcon
                                                    :active="active"
                                                    class="mr-2 h-5 w-5 text-indigo-400"
                                                    aria-hidden="true"
                                                />
                                                Editar
                                            </button>
                                        </MenuItem>
                                        <MenuItem v-slot="{ active }">
                                            <button
                                                :class="[
                        active ? 'bg-indigo-600 text-white' : 'text-gray-900',
                        'group flex w-full items-center rounded-md px-2 py-2 text-sm',
                      ]"
                                                @click="deleteUser(user)"
                                            >
                                                <TrashIcon
                                                    :active="active"
                                                    class="mr-2 h-5 w-5 text-indigo-400"
                                                    aria-hidden="true"
                                                />
                                                Borrar
                                            </button>
                                        </MenuItem>
                                    </div>
                                </MenuItems>
                            </transition>
                        </Menu>
                    </td>
                </tr>
                </tbody>
            </table>
            <div class="flex justify-between items-center mt-5">
                <span>
                    Mostrando del {{ users.from }} al {{ users.to }}
                </span>
                <nav
                    v-if="users.total > users.limit"
                    class="relative z-0 inline-flex justify-center rounded-md shadow-sm -space-x-px"
                    aria-label="Pagination"
                >

                    <a
                        v-for="(link, i) of users.links"
                        :key="i"
                        :disabled="!link.url"
                        href="#"
                        @click.prevent="getForPage($event, link)"
                        aria-current="page"
                        class="relative inline-flex items-center px-4 py-2 border text-sm font-medium whitespace-nowrap"
                        :class="[
                              link.active
                                ? 'z-10 bg-indigo-50 border-indigo-500 text-indigo-600'
                                : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50',
                              i === 0 ? 'rounded-l-md' : '',
                              i === users.links.length - 1 ? 'rounded-r-md' : '',
                              !link.url ? ' bg-gray-100 text-gray-700': ''
                        ]"
                        v-html="link.label"
                    >
                    </a>

                </nav>


            </div>
        </template>
    </div>
</template>

<script setup>
import {ArrowDownIcon, TrashIcon , PencilSquareIcon,EllipsisVerticalIcon} from "@heroicons/vue/20/solid/index.js";
import LoadingSpiner from "../../components/core/loadingSpiner.vue";
import {computed, onMounted, ref} from "vue";
import store from "../../store/index.js";
import {USERS_PER_PAGE} from "../../constants.js";
import TableHead from "../../components/Table/TableHead.vue";
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue'



const perPage = ref(USERS_PER_PAGE);
const search = ref('');
const users = computed(()=> store.state.users);
const sortBy = ref('updated_at');
const order = ref('desc');
const emit = defineEmits(['clickEdit']);

onMounted(()=>{
    getUsers();
})

function getUsers(url = null)
{
    store.dispatch('getUsers' , {
        url,
        search:search.value,
        perPage:perPage.value,
        sortBy : sortBy.value,
        order : order.value
    });
}
function deleteUser(user)
{
    if(!confirm('You want to delete this user')){
        return
    }
    store.dispatch('deleteUser',user.id).then((response) => {
        if(response.data.error){
            store.commit('showToast',['El cliente tiene pedidos registrados','alert']);
        }
        else{
            if(response.status==200){
                getUsers();
                store.commit('showToast',['El cliente ha sido borrado correctamente','success']);
            }
        }
    }).catch($error => {
        store.commit('showToast',['Ha ocurrido un error al borrar el cliente','error']);
        console.log($error);
    })
}
function editUser(user){
    emit('clickEdit',user);
}
function getForPage(event , linkPage){
    if(!linkPage.url || linkPage.active)
    {
        return
    }
    getUsers(linkPage.url);
}
function sortUsers(field)
{
    if(sortBy.value==field){
        if(order.value == 'asc'){
            order.value='desc';
        }
        else {
            order.value='asc';
        }
    }else{
        sortBy.value=field;
        order.value='asc';
    }

    getUsers();
}

</script>



<style scoped>

</style>
