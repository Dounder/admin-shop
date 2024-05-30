<template>
  <div class="bg-white px-5 py-2 rounded">
    <h1 class="text-3xl">
      Product: <small class="text-blue-500">{{ title }}</small>
    </h1>
    <hr class="my-4" />
  </div>

  <form @submit="onSubmit" class="grid grid-cols-1 sm:grid-cols-2 bg-white px-5 gap-5">
    <div class="first-col">
      <!-- Primera parte del formulario -->
      <div class="mb-4">
        <label for="title" class="form-label">Title</label>
        <CustomInput v-model="title" v-bind="titleAttrs" :error="errors.title" />
      </div>

      <div class="mb-4">
        <label for="slug" class="form-label">Slug</label>
        <CustomInput v-model="slug" v-bind="slugAttrs" :error="errors.slug" />
      </div>

      <div class="mb-4">
        <label for="description" class="form-label">Description</label>
        <CustomTextarea
          v-model="description"
          v-bind="descriptionAttrs"
          :error="errors.description"
        />
      </div>

      <div class="flex flex-row gap-3">
        <div class="mb-4 flex-1">
          <label for="price" class="form-label">Price</label>
          <CustomInput
            type="tel"
            v-model.number="price"
            v-bind="priceAttrs"
            :error="errors.price"
          />
        </div>

        <div class="mb-4 flex-1">
          <label for="stock" class="form-label">Stock</label>
          <CustomInput
            type="tel"
            v-model.number="stock"
            v-bind="stockAttrs"
            :error="errors.stock"
          />
        </div>
      </div>

      <div class="mb-4">
        <label for="sizes" class="form-label">Sizes</label>
        <div class="flex">
          <button
            v-for="(size, index) in allSizes"
            :key="index"
            type="button"
            :class="[
              'p-2 rounded w-14 mr-2 flex-1',
              { 'bg-blue-500 text-white': hasSize(size), 'bg-blue-100': !hasSize(size) },
            ]"
            @click="toggleSize(size)"
          >
            {{ size }}
          </button>
        </div>
      </div>
    </div>

    <!-- Segunda columna -->
    <div class="first-col">
      <label for="stock" class="form-label">Images</label>
      <!-- Row with scrollable horizontal -->
      <div class="flex p-2 overflow-x-auto space-x-8 w-full h-[265px] bg-gray-200 rounded">
        <div v-for="image in images" :key="image.value" class="flex-shrink-0">
          <img :src="image.value" :alt="title" class="w-[250px] h-[250px] rounded" />
        </div>
      </div>
      <!-- Upload image -->
      <div class="col-span-2 my-2">
        <label for="image" class="form-label">Upload Image</label>

        <input multiple type="file" id="image" class="form-control" />
      </div>

      <div class="mb-4">
        <label for="stock" class="form-label">Genre</label>
        <CustomSelect
          v-model="gender"
          v-bind="genderAttrs"
          :error="errors.gender"
          :options="[
            { value: 'kid', label: 'Kid' },
            { value: 'women', label: 'women' },
            { value: 'men', label: 'Men' },
          ]"
        />
      </div>

      <!-- Botón para guardar -->
      <div class="my-4 text-right">
        <button
          type="submit"
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Save
        </button>
      </div>
    </div>
  </form>

  <div class="grid grid-cols-2">
    <div class="bg-blue-200 p-2">
      <code>
        <pre>
          {{ values }}
        </pre>
      </code>
    </div>
    <div class="bg-red-200 p-2">
      <code>
        <pre>
          {{ errors }}
        </pre>
      </code>
    </div>
    <div class="bg-green-200 p-2 col-span-2">
      <code>
        <pre>
          {{ meta }}
        </pre>
      </code>
    </div>
  </div>
</template>

<script src="./ProductView.ts" lang="ts" />

<style scoped>
.form-label {
  @apply block text-gray-700 text-sm font-bold mb-2;
}

.form-control {
  @apply shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none;
}
</style>
