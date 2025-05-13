<script setup>
import { onMounted, ref } from 'vue'
import axios from 'axios'

// Variable reactiva
const lista = ref([])
const cliente = ref({})

const dialogEdit = ref(false)
const dialogDelete = ref(false)
const dialogMens = ref(false)

const mensaje = ref("")

const maxFecha = ref(new Date().toISOString().split('T')[0])

// Acceder a variable de entorno
const api_url = import.meta.env.VITE_API_URL

// Llamada a la API cuando el componente se monta
onMounted(() => {
    axios.get(api_url)
        .then((res) => {
            console.log(res.data)
            lista.value = res.data
        })
        .catch((err) => console.log(err))
})

const setData = (client) => {
    cliente.value = client
    dialogEdit.value = true
}

const setDelete = (client) => {
    cliente.value = client
    dialogDelete.value = true
}

const doDelete = async () => {
    axios.delete(`${api_url}/${cliente.id}`)
        .then((res) => {
            console.log(res.data);
            dialogDelete.value = false;
            cliente.value = {}
            showMensaje(res.data)
        })
        .catch((err) => {
            console.log(err)
            showMensaje(err.response.data.message)
        })
}

const showMensaje = (texto) => {
    mensaje.value = texto;
    dialogMens.value = true;
    setTimeout(() => {
        dialogMens.value = false;
        window.location.reload();
    }, 3000);
}

const doPut = async () => {
    console.log(cliente.value.id)
    axios.put(`${api_url}/${cliente.value.id}`, {
        nombre: cliente.value.nombre,
        apellidos: cliente.value.apellidos,
        fechaNacimiento: cliente.value.fechaNacimiento,
        curp: cliente.value.curp
    })
        .then((res) => {
            console.log(res.data);
            dialogEdit.value = false;
            cliente.value = {}
            showMensaje("Cliente actualizado")
        })
        .catch((err) => {
            console.log(err)
            showMensaje(err.response.data.message)
        })
}

</script>

<template>
    <h1>Clientes disponibles: {{ lista.length }}</h1>
    <div v-if="lista.length !== 0">
        <ul id="cliente-list">
            <li v-for="c in lista" class="client-card" :key="c.id">
                <div class="row">
                    <svg class="svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                        <path
                            d="M224 16c-6.7 0-10.8-2.8-15.5-6.1C201.9 5.4 194 0 176 0c-30.5 0-52 43.7-66 89.4C62.7 98.1 32 112.2 32 128c0 14.3 25 27.1 64.6 35.9c-.4 4-.6 8-.6 12.1c0 17 3.3 33.2 9.3 48l-59.9 0C38 224 32 230 32 237.4c0 1.7 .3 3.4 1 5l38.8 96.9C28.2 371.8 0 423.8 0 482.3C0 498.7 13.3 512 29.7 512l388.6 0c16.4 0 29.7-13.3 29.7-29.7c0-58.5-28.2-110.4-71.7-143L415 242.4c.6-1.6 1-3.3 1-5c0-7.4-6-13.4-13.4-13.4l-59.9 0c6-14.8 9.3-31 9.3-48c0-4.1-.2-8.1-.6-12.1C391 155.1 416 142.3 416 128c0-15.8-30.7-29.9-78-38.6C324 43.7 302.5 0 272 0c-18 0-25.9 5.4-32.5 9.9c-4.8 3.3-8.8 6.1-15.5 6.1zm56 208l-12.4 0c-16.5 0-31.1-10.6-36.3-26.2c-2.3-7-12.2-7-14.5 0c-5.2 15.6-19.9 26.2-36.3 26.2L168 224c-22.1 0-40-17.9-40-40l0-14.4c28.2 4.1 61 6.4 96 6.4s67.8-2.3 96-6.4l0 14.4c0 22.1-17.9 40-40 40zm-88 96l16 32L176 480 128 288l64 32zm128-32L272 480 240 352l16-32 64-32z" />
                    </svg>
                    <div>
                        <div>{{ c.nombre }} {{ c.apellidos }}</div>
                        {{ c.fechaNacimiento }}
                    </div>
                </div>

                <div>
                    Curp: {{ c.curp }}
                    <div class="para-alla">
                        <a @click="setData(c)" target="_blank" rel="noopener"> <svg class="svg2"
                                xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                <path
                                    d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1 0 32c0 8.8 7.2 16 16 16l32 0zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z" />
                            </svg></a>
                        <a @click="setDelete(c)" target="_blank" rel="noopener"><svg class="svg2"
                                xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                <path
                                    d="M135.2 17.7L128 32 32 32C14.3 32 0 46.3 0 64S14.3 96 32 96l384 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-96 0-7.2-14.3C307.4 6.8 296.3 0 284.2 0L163.8 0c-12.1 0-23.2 6.8-28.6 17.7zM416 128L32 128 53.2 467c1.6 25.3 22.6 45 47.9 45l245.8 0c25.3 0 46.3-19.7 47.9-45L416 128z" />
                            </svg></a>
                    </div>
                </div>
            </li>
        </ul>
        <transition name="dialog-fade">
            <dialog id="editar" v-if="dialogEdit" open>
                <h1 class="green">Actualizar cliente</h1>
                <div class="wave-group">
                    <input required="" type="text" class="input" v-model="cliente.nombre">
                    <span class="bar"></span>
                    <label class="label">
                        <span class="label-char" style="--index: 0">N</span>
                        <span class="label-char" style="--index: 1">o</span>
                        <span class="label-char" style="--index: 2">m</span>
                        <span class="label-char" style="--index: 3">b</span>
                        <span class="label-char" style="--index: 4">r</span>
                        <span class="label-char" style="--index: 5">e</span>
                    </label>
                </div>
                <div class="wave-group">
                    <input required="" type="text" v-model="cliente.apellidos" class="input">
                    <span class="bar"></span>
                    <label class="label">
                        <span class="label-char" style="--index: 0">A</span>
                        <span class="label-char" style="--index: 1">p</span>
                        <span class="label-char" style="--index: 2">e</span>
                        <span class="label-char" style="--index: 3">l</span>
                        <span class="label-char" style="--index: 4">l</span>
                        <span class="label-char" style="--index: 5">i</span>
                        <span class="label-char" style="--index: 6">d</span>
                        <span class="label-char" style="--index: 7">o</span>
                    </label>
                </div>
                <div class="wave-group">
                    <input required="" type="date" v-model="cliente.fechaNacimiento" class="input" autofocus :max="maxFecha">
                    <span class="bar"></span>
                    <label class="label">
                        <span class="label-char" style="--index: 0">F</span>
                        <span class="label-char" style="--index: 1">e</span>
                        <span class="label-char" style="--index: 2">c</span>
                        <span class="label-char" style="--index: 3">h</span>
                        <span class="label-char" style="--index: 4">a</span>
                        <span class="label-char" style="--index: 5">_</span>
                        <span class="label-char" style="--index: 6">n</span>
                        <span class="label-char" style="--index: 7">a</span>
                        <span class="label-char" style="--index: 8">c</span>
                        <span class="label-char" style="--index: 9">i</span>
                        <span class="label-char" style="--index: 10">m</span>
                    </label>
                </div>
                <div class="wave-group">
                    <input required="" type="text" v-model="cliente.curp" class="input" readonly autofocus>
                    <span class="bar"></span>
                    <label class="label">
                        <span class="label-char" style="--index: 0">C</span>
                        <span class="label-char" style="--index: 1">U</span>
                        <span class="label-char" style="--index: 2">R</span>
                        <span class="label-char" style="--index: 3">P</span>
                    </label>
                </div>
                <div class="para-alla space-2">
                    <a @click="dialogEdit = false">Cerrar</a>
                    <a @click="doPut">Actualizar</a>
                </div>
            </dialog>
        </transition>
        <transition name="dialog-fade">
            <dialog id="eliminar" v-if="dialogDelete" open>
                <svg class="svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                    <path
                        d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zm0-384c13.3 0 24 10.7 24 24l0 112c0 13.3-10.7 24-24 24s-24-10.7-24-24l0-112c0-13.3 10.7-24 24-24zM224 352a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z" />
                </svg>
                <h1 class="green">¿Eliminar?</h1>
                <div class="para-alla space-2">
                    <a @click="dialogDelete = false">No</a>
                    <a @click="doDelete">Si</a>
                </div>
            </dialog>
        </transition>
        <transition name="dialog-fade">
            <dialog id="mensaje" v-if="dialogMens" open>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                    <path
                        d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209L241 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L335 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z" />
                </svg>
                <h1 class="green">¡Éxito!</h1>
                <h3>{{ mensaje }}</h3>
            </dialog>
        </transition>
    </div>
</template>

<style scoped>
.svg {
    fill: hsla(160, 100%, 37%, 1);
    width: 3.5em;
    height: 3.5em;
}

.svg2 {
    fill: hsla(160, 100%, 37%, 1);
    width: 1.5em;
    height: 1.5em;
    margin-left: 2px;
    margin-right: 2px;
}

ul {
    list-style: none;
    padding: .5em;
    max-height: 50dvh;
    overflow-y: scroll;
    scrollbar-width: none;
}

ul::-webkit-scrollbar {
    display: none;
}

.row {
    display: flex;
    flex-direction: row;
    gap: 5px;
}

.client-card {
    background-color: hsla(160, 100%, 37%, 0.2);
    margin-top: 2px;
    display: flex;
    flex-direction: row;
    padding: .5rem;
    border-radius: .5em;
    justify-content: space-between;
    transform: translateY(40px) scale(.8);
    animation: fadeIn 1.2s ease-in forwards;
    animation-timeline: view();
    animation-range: entry 0% cover 40%;
}

@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(40px) scale(.8);
    }

    to {
        opacity: 1;
        transform: translateY(0) scale(1);
    }
}

dialog {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #282828 !important;
    z-index: 1000;
    display: flex;
    flex-direction: column;
    border-radius: 8px;
    padding: 1rem;
    color: white;
    border: 4px solid transparent;
    background-clip: padding-box;
}

@keyframes animate {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}

.para-alla {
    justify-content: flex-end;
    align-items: end;
    width: 100%;
    display: flex;
}

.dialog-fade-enter-active,
.dialog-fade-leave-active {
    transition: opacity 0.3s ease, transform 0.3s ease;
}

.dialog-fade-enter-from,
.dialog-fade-leave-to {
    opacity: 0;
}

.dialog-fade-enter-to,
.dialog-fade-leave-from {
    opacity: 1
}

/* From Uiverse.io by AbanoubMagdy1 */
.wave-group {
    position: relative;
    /*Lo puse yo */
    margin-top: 5px;
    margin-bottom: 5px;
}

.wave-group .input {
    font-size: 16px;
    padding: 10px 10px 10px 5px;
    display: block;
    width: 200px;
    border: none;
    border-bottom: 1px solid #515151;
    background: transparent;
    color: hsla(160, 100%, 37%, 1);
}

.wave-group .input:focus {
    outline: none;
}

.wave-group .label {
    color: #999;
    font-size: 18px;
    font-weight: normal;
    position: absolute;
    pointer-events: none;
    left: 5px;
    top: 10px;
    display: flex;
}

.wave-group .label-char {
    transition: 0.2s ease all;
    transition-delay: calc(var(--index) * .05s);
}

.wave-group .input:focus~label .label-char,
.wave-group .input:valid~label .label-char {
    transform: translateY(-20px);
    font-size: 14px;
    color: hsla(160, 100%, 37%, 0.2);
}

.wave-group .bar {
    position: relative;
    display: block;
    width: 200px;
}

.wave-group .bar:before,
.wave-group .bar:after {
    content: '';
    height: 2px;
    width: 0;
    bottom: 1px;
    position: absolute;
    background: hsla(160, 100%, 37%, 0.2);
    transition: 0.2s ease all;
    -moz-transition: 0.2s ease all;
    -webkit-transition: 0.2s ease all;
}

.wave-group .bar:before {
    left: 50%;
}

.wave-group .bar:after {
    right: 50%;
}

.wave-group .input:focus~.bar:before,
.wave-group .input:focus~.bar:after {
    width: 50%;
}

.space-2 {
    gap: 1rem;
    padding: 1rem 0;
}
</style>
