<script>
import axios from 'axios'
export default {
    props: {
        cambiar: {
            type: Function,
            required: true
        }
    },
    data() {
        return {
            nombre: '',
            apellidos: '',
            fechaNacimiento: '',
            curp: '',
            exito: false,
            error: false,
            mensaje: '',
            hoy: new Date().toISOString().split('T')[0]
        }
    },
    methods: {
        showError(err) {
            this.mensaje = err;
            this.error = true;
            setTimeout(() => {
                this.error = false;
            }, 3000);
        },
        registrar() {
            if (this.nombre === "") {
                this.showError("Campo de nombre vacio");
                return;
            } else if (this.apellidos === "") {
                this.showError("Campo de apellidos vacio");
                return;
            } else if (this.fechaNacimiento === "") {
                this. showError("Campo de fecha de nacimiento vacio");
                return;
            } else if (this.curp === "") {
                this.showError("Campo de curp vacio");
                return;
            }
            if ((this.nombre.match(/[^a-zA-Z\s]/g) || []).length !== 0) {
                this.showError("Tu nombre no puede incluir carácteres especiales ni números");
                return;
            }
            if ((this.apellidos.match(/[^a-zA-Z\s]/g) || []).length !== 0) {
                this.showError("Tus apellidos no pueden incluir carácteres especiales ni números");
                return;
            }
            axios.post(import.meta.env.VITE_API_URL, {
                nombre: this.nombre,
                apellidos: this.apellidos,
                fechaNacimiento: this.fechaNacimiento,
                curp: this.curp
            })
                .then(res => {
                    console.log(res.data)
                    this.exito = true
                    this.mensaje = "¡Cliente registrado!"
                })
                .catch(err => {
                    console.error(err); console.error("Error", err, err.response.data.message);
                    if (err.response.data.message.includes("Duplicate entry")) {
                        this.showError("¡La curp ingresada ya existe!");
                    } else {
                        this.showError(`¡${err, err.response.data.message}!`);
                    }
                })
        },
        doSomething() {
            this.exito = false;
            this.error = false;
            this.mensaje = '';
            this.cambiar();
        }
    }
}
</script>
<template>
    <h1 class="green">Registrar cliente</h1>
    <form @event="prevent"></form>
    <div class="wave-group">
        <input required="true" type="text" class="input" v-model="nombre">
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
        <input required="true" type="text" v-model="apellidos" class="input">
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
        <input required="true" type="date" v-model="fechaNacimiento" class="input" autofocus :max="hoy">
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
        <input required="true" type="text" v-model="curp" class="input">
        <span class="bar"></span>
        <label class="label">
            <span class="label-char" style="--index: 0">C</span>
            <span class="label-char" style="--index: 1">U</span>
            <span class="label-char" style="--index: 2">R</span>
            <span class="label-char" style="--index: 3">P</span>
        </label>
    </div>
    <div class="para-alla">
        <a @click="registrar">Crear</a>
    </div>
    <transition name="dialog-fade">
        <dialog id="editar" v-if="exito" open>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                <path
                    d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209L241 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L335 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z" />
            </svg>
            <h1 class="green">¡Éxito!</h1>
            <h3>{{ this.mensaje }}</h3>
            <a @click="doSomething">Cerrar</a>
        </dialog>
    </transition>
    <transition name="dialog-fade">
        <dialog id="error" v-if="error" open>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                <path
                    d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zm0-384c13.3 0 24 10.7 24 24l0 112c0 13.3-10.7 24-24 24s-24-10.7-24-24l0-112c0-13.3 10.7-24 24-24zM224 352a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z" />
            </svg>
            <h1 class="green">¡Error!</h1>
            <h3>{{ this.mensaje }}</h3>
        </dialog>
    </transition>
</template>
<style embed>
/* From Uiverse.io by AbanoubMagdy1 */
.wave-group {
    position: relative;
    /*Lo puse yo */
    margin-top: 10px;
    margin-bottom: 10px;
}

.wave-group .input {
    font-size: 16px;
    padding: 10px 10px 10px 5px;
    display: block;
    width: 100% !important;
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
    width: calc(100% -5rem);
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

.para-alla {
    justify-content: flex-end;
    align-items: end;
    width: calc(100% -5rem);
    display: flex;
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
    justify-content: center;
    align-items: center;
}

svg {
    fill: hsla(160, 100%, 37%, 1);
    width: 3.5em;
    height: 3.5em;
}
</style>