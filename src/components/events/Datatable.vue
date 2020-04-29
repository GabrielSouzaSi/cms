<template>
  <div class="container">
    <div class="row mt-5">
      <div class="mx-auto p-2">
        <table id="table_id" class="table table-striped table-bordered">
          <thead>
            <tr>
              <th>#</th>
              <th>Evento</th>
              <th>Data</th>
              <th>Local</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>John</td>
              <td>Doe</td>
              <td>john@example.com</td>
              <td>
                <div class="btn-group btn-group-sm">
                  <button
                    type="button"
                    class="btn btn-primary"
                    data-toggle="tooltip"
                    data-placement="top"
                    title="Visualizar!"
                  >
                    <svg
                      class="bi bi-eye"
                      width="25"
                      height="25"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M18 10s-3-5.5-8-5.5S2 10 2 10s3 5.5 8 5.5 8-5.5 8-5.5zM3.173 10a13.133 13.133 0 001.66 2.043C6.12 13.332 7.88 14.5 10 14.5c2.12 0 3.879-1.168 5.168-2.457A13.133 13.133 0 0016.828 10a13.133 13.133 0 00-1.66-2.043C13.879 6.668 12.119 5.5 10 5.5c-2.12 0-3.879 1.168-5.168 2.457A13.133 13.133 0 003.172 10z"
                        clip-rule="evenodd"
                      />
                      <path
                        fill-rule="evenodd"
                        d="M10 7.5a2.5 2.5 0 100 5 2.5 2.5 0 000-5zM6.5 10a3.5 3.5 0 117 0 3.5 3.5 0 01-7 0z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </button>
                  <button
                    type="button"
                    class="btn btn-success"
                    data-toggle="tooltip"
                    data-placement="top"
                    title="Editar!"
                  >
                    <svg
                      class="bi bi-pencil"
                      width="25"
                      height="25"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M13.293 3.293a1 1 0 011.414 0l2 2a1 1 0 010 1.414l-9 9a1 1 0 01-.39.242l-3 1a1 1 0 01-1.266-1.265l1-3a1 1 0 01.242-.391l9-9zM14 4l2 2-9 9-3 1 1-3 9-9z"
                        clip-rule="evenodd"
                      />
                      <path
                        fill-rule="evenodd"
                        d="M14.146 8.354l-2.5-2.5.708-.708 2.5 2.5-.708.708zM5 12v.5a.5.5 0 00.5.5H6v.5a.5.5 0 00.5.5H7v.5a.5.5 0 00.5.5H8v-1.5a.5.5 0 00-.5-.5H7v-.5a.5.5 0 00-.5-.5H5z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </button>
                  <button
                    type="button"
                    class="btn btn-danger"
                    data-toggle="tooltip"
                    data-placement="top"
                    title="Excluir!"
                  >
                    <svg
                      class="bi bi-x"
                      width="25"
                      height="25"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M5.646 5.646a.5.5 0 000 .708l8 8a.5.5 0 00.708-.708l-8-8a.5.5 0 00-.708 0z"
                        clip-rule="evenodd"
                      />
                      <path
                        fill-rule="evenodd"
                        d="M14.354 5.646a.5.5 0 010 .708l-8 8a.5.5 0 01-.708-.708l8-8a.5.5 0 01.708 0z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
              </td>
            </tr>
            <tr>
              <td>2</td>
              <td>Mary</td>
              <td>Moe</td>
              <td>mary@example.com</td>
              <td>
                <div class="btn-group btn-group-sm">
                  <button
                    type="button"
                    class="btn btn-primary"
                    data-toggle="tooltip"
                    data-placement="top"
                    title="Visualizar!"
                  >
                    <svg
                      class="bi bi-eye"
                      width="25"
                      height="25"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M18 10s-3-5.5-8-5.5S2 10 2 10s3 5.5 8 5.5 8-5.5 8-5.5zM3.173 10a13.133 13.133 0 001.66 2.043C6.12 13.332 7.88 14.5 10 14.5c2.12 0 3.879-1.168 5.168-2.457A13.133 13.133 0 0016.828 10a13.133 13.133 0 00-1.66-2.043C13.879 6.668 12.119 5.5 10 5.5c-2.12 0-3.879 1.168-5.168 2.457A13.133 13.133 0 003.172 10z"
                        clip-rule="evenodd"
                      />
                      <path
                        fill-rule="evenodd"
                        d="M10 7.5a2.5 2.5 0 100 5 2.5 2.5 0 000-5zM6.5 10a3.5 3.5 0 117 0 3.5 3.5 0 01-7 0z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </button>
                  <button
                    type="button"
                    class="btn btn-success"
                    data-toggle="tooltip"
                    data-placement="top"
                    title="Editar!"
                  >
                    <svg
                      class="bi bi-pencil"
                      width="25"
                      height="25"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M13.293 3.293a1 1 0 011.414 0l2 2a1 1 0 010 1.414l-9 9a1 1 0 01-.39.242l-3 1a1 1 0 01-1.266-1.265l1-3a1 1 0 01.242-.391l9-9zM14 4l2 2-9 9-3 1 1-3 9-9z"
                        clip-rule="evenodd"
                      />
                      <path
                        fill-rule="evenodd"
                        d="M14.146 8.354l-2.5-2.5.708-.708 2.5 2.5-.708.708zM5 12v.5a.5.5 0 00.5.5H6v.5a.5.5 0 00.5.5H7v.5a.5.5 0 00.5.5H8v-1.5a.5.5 0 00-.5-.5H7v-.5a.5.5 0 00-.5-.5H5z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </button>
                  <button
                    type="button"
                    class="btn btn-danger"
                    data-toggle="tooltip"
                    data-placement="top"
                    title="Excluir!"
                  >
                    <svg
                      class="bi bi-x"
                      width="25"
                      height="25"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M5.646 5.646a.5.5 0 000 .708l8 8a.5.5 0 00.708-.708l-8-8a.5.5 0 00-.708 0z"
                        clip-rule="evenodd"
                      />
                      <path
                        fill-rule="evenodd"
                        d="M14.354 5.646a.5.5 0 010 .708l-8 8a.5.5 0 01-.708-.708l8-8a.5.5 0 01.708 0z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
              </td>
            </tr>
            <tr>
              <td>3</td>
              <td>July</td>
              <td>Dooley</td>
              <td>july@example.com</td>
              <td>
                <div class="btn-group btn-group-sm">
                  <button
                    type="button"
                    class="btn btn-primary"
                    data-toggle="tooltip"
                    data-placement="top"
                    title="Visualizar!"
                  >
                    <svg
                      class="bi bi-eye"
                      width="25"
                      height="25"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M18 10s-3-5.5-8-5.5S2 10 2 10s3 5.5 8 5.5 8-5.5 8-5.5zM3.173 10a13.133 13.133 0 001.66 2.043C6.12 13.332 7.88 14.5 10 14.5c2.12 0 3.879-1.168 5.168-2.457A13.133 13.133 0 0016.828 10a13.133 13.133 0 00-1.66-2.043C13.879 6.668 12.119 5.5 10 5.5c-2.12 0-3.879 1.168-5.168 2.457A13.133 13.133 0 003.172 10z"
                        clip-rule="evenodd"
                      />
                      <path
                        fill-rule="evenodd"
                        d="M10 7.5a2.5 2.5 0 100 5 2.5 2.5 0 000-5zM6.5 10a3.5 3.5 0 117 0 3.5 3.5 0 01-7 0z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </button>
                  <button
                    type="button"
                    class="btn btn-success"
                    data-toggle="tooltip"
                    data-placement="top"
                    title="Editar!"
                  >
                    <svg
                      class="bi bi-pencil"
                      width="25"
                      height="25"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M13.293 3.293a1 1 0 011.414 0l2 2a1 1 0 010 1.414l-9 9a1 1 0 01-.39.242l-3 1a1 1 0 01-1.266-1.265l1-3a1 1 0 01.242-.391l9-9zM14 4l2 2-9 9-3 1 1-3 9-9z"
                        clip-rule="evenodd"
                      />
                      <path
                        fill-rule="evenodd"
                        d="M14.146 8.354l-2.5-2.5.708-.708 2.5 2.5-.708.708zM5 12v.5a.5.5 0 00.5.5H6v.5a.5.5 0 00.5.5H7v.5a.5.5 0 00.5.5H8v-1.5a.5.5 0 00-.5-.5H7v-.5a.5.5 0 00-.5-.5H5z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </button>
                  <button
                    type="button"
                    class="btn btn-danger"
                    data-toggle="tooltip"
                    data-placement="top"
                    title="Excluir!"
                  >
                    <svg
                      class="bi bi-x"
                      width="25"
                      height="25"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M5.646 5.646a.5.5 0 000 .708l8 8a.5.5 0 00.708-.708l-8-8a.5.5 0 00-.708 0z"
                        clip-rule="evenodd"
                      />
                      <path
                        fill-rule="evenodd"
                        d="M14.354 5.646a.5.5 0 010 .708l-8 8a.5.5 0 01-.708-.708l8-8a.5.5 0 01.708 0z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
              </td>
            </tr>
            <tr>
              <td>4</td>
              <td>John</td>
              <td>Doe</td>
              <td>john@example.com</td>
              <td>
                <div class="btn-group btn-group-sm">
                  <button
                    type="button"
                    class="btn btn-primary"
                    data-toggle="tooltip"
                    data-placement="top"
                    title="Visualizar!"
                  >
                    <svg
                      class="bi bi-eye"
                      width="25"
                      height="25"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M18 10s-3-5.5-8-5.5S2 10 2 10s3 5.5 8 5.5 8-5.5 8-5.5zM3.173 10a13.133 13.133 0 001.66 2.043C6.12 13.332 7.88 14.5 10 14.5c2.12 0 3.879-1.168 5.168-2.457A13.133 13.133 0 0016.828 10a13.133 13.133 0 00-1.66-2.043C13.879 6.668 12.119 5.5 10 5.5c-2.12 0-3.879 1.168-5.168 2.457A13.133 13.133 0 003.172 10z"
                        clip-rule="evenodd"
                      />
                      <path
                        fill-rule="evenodd"
                        d="M10 7.5a2.5 2.5 0 100 5 2.5 2.5 0 000-5zM6.5 10a3.5 3.5 0 117 0 3.5 3.5 0 01-7 0z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </button>
                  <button
                    type="button"
                    class="btn btn-success"
                    data-toggle="tooltip"
                    data-placement="top"
                    title="Editar!"
                  >
                    <svg
                      class="bi bi-pencil"
                      width="25"
                      height="25"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M13.293 3.293a1 1 0 011.414 0l2 2a1 1 0 010 1.414l-9 9a1 1 0 01-.39.242l-3 1a1 1 0 01-1.266-1.265l1-3a1 1 0 01.242-.391l9-9zM14 4l2 2-9 9-3 1 1-3 9-9z"
                        clip-rule="evenodd"
                      />
                      <path
                        fill-rule="evenodd"
                        d="M14.146 8.354l-2.5-2.5.708-.708 2.5 2.5-.708.708zM5 12v.5a.5.5 0 00.5.5H6v.5a.5.5 0 00.5.5H7v.5a.5.5 0 00.5.5H8v-1.5a.5.5 0 00-.5-.5H7v-.5a.5.5 0 00-.5-.5H5z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </button>
                  <button
                    type="button"
                    class="btn btn-danger"
                    data-toggle="tooltip"
                    data-placement="top"
                    title="Excluir!"
                  >
                    <svg
                      class="bi bi-x"
                      width="25"
                      height="25"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M5.646 5.646a.5.5 0 000 .708l8 8a.5.5 0 00.708-.708l-8-8a.5.5 0 00-.708 0z"
                        clip-rule="evenodd"
                      />
                      <path
                        fill-rule="evenodd"
                        d="M14.354 5.646a.5.5 0 010 .708l-8 8a.5.5 0 01-.708-.708l8-8a.5.5 0 01.708 0z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
              </td>
            </tr>
            <tr>
              <td>5</td>
              <td>Mary</td>
              <td>Moe</td>
              <td>mary@example.com</td>
              <td>
                <div class="btn-group btn-group-sm">
                  <button
                    type="button"
                    class="btn btn-primary"
                    data-toggle="tooltip"
                    data-placement="top"
                    title="Visualizar!"
                  >
                    <svg
                      class="bi bi-eye"
                      width="25"
                      height="25"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M18 10s-3-5.5-8-5.5S2 10 2 10s3 5.5 8 5.5 8-5.5 8-5.5zM3.173 10a13.133 13.133 0 001.66 2.043C6.12 13.332 7.88 14.5 10 14.5c2.12 0 3.879-1.168 5.168-2.457A13.133 13.133 0 0016.828 10a13.133 13.133 0 00-1.66-2.043C13.879 6.668 12.119 5.5 10 5.5c-2.12 0-3.879 1.168-5.168 2.457A13.133 13.133 0 003.172 10z"
                        clip-rule="evenodd"
                      />
                      <path
                        fill-rule="evenodd"
                        d="M10 7.5a2.5 2.5 0 100 5 2.5 2.5 0 000-5zM6.5 10a3.5 3.5 0 117 0 3.5 3.5 0 01-7 0z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </button>
                  <button
                    type="button"
                    class="btn btn-success"
                    data-toggle="tooltip"
                    data-placement="top"
                    title="Editar!"
                  >
                    <svg
                      class="bi bi-pencil"
                      width="25"
                      height="25"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M13.293 3.293a1 1 0 011.414 0l2 2a1 1 0 010 1.414l-9 9a1 1 0 01-.39.242l-3 1a1 1 0 01-1.266-1.265l1-3a1 1 0 01.242-.391l9-9zM14 4l2 2-9 9-3 1 1-3 9-9z"
                        clip-rule="evenodd"
                      />
                      <path
                        fill-rule="evenodd"
                        d="M14.146 8.354l-2.5-2.5.708-.708 2.5 2.5-.708.708zM5 12v.5a.5.5 0 00.5.5H6v.5a.5.5 0 00.5.5H7v.5a.5.5 0 00.5.5H8v-1.5a.5.5 0 00-.5-.5H7v-.5a.5.5 0 00-.5-.5H5z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </button>
                  <button
                    type="button"
                    class="btn btn-danger"
                    data-toggle="tooltip"
                    data-placement="top"
                    title="Excluir!"
                  >
                    <svg
                      class="bi bi-x"
                      width="25"
                      height="25"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M5.646 5.646a.5.5 0 000 .708l8 8a.5.5 0 00.708-.708l-8-8a.5.5 0 00-.708 0z"
                        clip-rule="evenodd"
                      />
                      <path
                        fill-rule="evenodd"
                        d="M14.354 5.646a.5.5 0 010 .708l-8 8a.5.5 0 01-.708-.708l8-8a.5.5 0 01.708 0z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
              </td>
            </tr>
            <tr>
              <td>6</td>
              <td>July</td>
              <td>Dooley</td>
              <td>july@example.com</td>
              <td>
                <div class="btn-group btn-group-sm">
                  <button
                    type="button"
                    class="btn btn-primary"
                    data-toggle="tooltip"
                    data-placement="top"
                    title="Visualizar!"
                  >
                    <svg
                      class="bi bi-eye"
                      width="25"
                      height="25"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M18 10s-3-5.5-8-5.5S2 10 2 10s3 5.5 8 5.5 8-5.5 8-5.5zM3.173 10a13.133 13.133 0 001.66 2.043C6.12 13.332 7.88 14.5 10 14.5c2.12 0 3.879-1.168 5.168-2.457A13.133 13.133 0 0016.828 10a13.133 13.133 0 00-1.66-2.043C13.879 6.668 12.119 5.5 10 5.5c-2.12 0-3.879 1.168-5.168 2.457A13.133 13.133 0 003.172 10z"
                        clip-rule="evenodd"
                      />
                      <path
                        fill-rule="evenodd"
                        d="M10 7.5a2.5 2.5 0 100 5 2.5 2.5 0 000-5zM6.5 10a3.5 3.5 0 117 0 3.5 3.5 0 01-7 0z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </button>
                  <button
                    type="button"
                    class="btn btn-success"
                    data-toggle="tooltip"
                    data-placement="top"
                    title="Editar!"
                  >
                    <svg
                      class="bi bi-pencil"
                      width="25"
                      height="25"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M13.293 3.293a1 1 0 011.414 0l2 2a1 1 0 010 1.414l-9 9a1 1 0 01-.39.242l-3 1a1 1 0 01-1.266-1.265l1-3a1 1 0 01.242-.391l9-9zM14 4l2 2-9 9-3 1 1-3 9-9z"
                        clip-rule="evenodd"
                      />
                      <path
                        fill-rule="evenodd"
                        d="M14.146 8.354l-2.5-2.5.708-.708 2.5 2.5-.708.708zM5 12v.5a.5.5 0 00.5.5H6v.5a.5.5 0 00.5.5H7v.5a.5.5 0 00.5.5H8v-1.5a.5.5 0 00-.5-.5H7v-.5a.5.5 0 00-.5-.5H5z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </button>
                  <button
                    type="button"
                    class="btn btn-danger"
                    data-toggle="tooltip"
                    data-placement="top"
                    title="Excluir!"
                  >
                    <svg
                      class="bi bi-x"
                      width="25"
                      height="25"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M5.646 5.646a.5.5 0 000 .708l8 8a.5.5 0 00.708-.708l-8-8a.5.5 0 00-.708 0z"
                        clip-rule="evenodd"
                      />
                      <path
                        fill-rule="evenodd"
                        d="M14.354 5.646a.5.5 0 010 .708l-8 8a.5.5 0 01-.708-.708l8-8a.5.5 0 01.708 0z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
              </td>
            </tr>
            <tr>
              <td>7</td>
              <td>John</td>
              <td>Doe</td>
              <td>john@example.com</td>
              <td>
                <div class="btn-group btn-group-sm">
                  <button
                    type="button"
                    class="btn btn-primary"
                    data-toggle="tooltip"
                    data-placement="top"
                    title="Visualizar!"
                  >
                    <svg
                      class="bi bi-eye"
                      width="25"
                      height="25"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M18 10s-3-5.5-8-5.5S2 10 2 10s3 5.5 8 5.5 8-5.5 8-5.5zM3.173 10a13.133 13.133 0 001.66 2.043C6.12 13.332 7.88 14.5 10 14.5c2.12 0 3.879-1.168 5.168-2.457A13.133 13.133 0 0016.828 10a13.133 13.133 0 00-1.66-2.043C13.879 6.668 12.119 5.5 10 5.5c-2.12 0-3.879 1.168-5.168 2.457A13.133 13.133 0 003.172 10z"
                        clip-rule="evenodd"
                      />
                      <path
                        fill-rule="evenodd"
                        d="M10 7.5a2.5 2.5 0 100 5 2.5 2.5 0 000-5zM6.5 10a3.5 3.5 0 117 0 3.5 3.5 0 01-7 0z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </button>
                  <button
                    type="button"
                    class="btn btn-success"
                    data-toggle="tooltip"
                    data-placement="top"
                    title="Editar!"
                  >
                    <svg
                      class="bi bi-pencil"
                      width="25"
                      height="25"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M13.293 3.293a1 1 0 011.414 0l2 2a1 1 0 010 1.414l-9 9a1 1 0 01-.39.242l-3 1a1 1 0 01-1.266-1.265l1-3a1 1 0 01.242-.391l9-9zM14 4l2 2-9 9-3 1 1-3 9-9z"
                        clip-rule="evenodd"
                      />
                      <path
                        fill-rule="evenodd"
                        d="M14.146 8.354l-2.5-2.5.708-.708 2.5 2.5-.708.708zM5 12v.5a.5.5 0 00.5.5H6v.5a.5.5 0 00.5.5H7v.5a.5.5 0 00.5.5H8v-1.5a.5.5 0 00-.5-.5H7v-.5a.5.5 0 00-.5-.5H5z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </button>
                  <button
                    type="button"
                    class="btn btn-danger"
                    data-toggle="tooltip"
                    data-placement="top"
                    title="Excluir!"
                  >
                    <svg
                      class="bi bi-x"
                      width="25"
                      height="25"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M5.646 5.646a.5.5 0 000 .708l8 8a.5.5 0 00.708-.708l-8-8a.5.5 0 00-.708 0z"
                        clip-rule="evenodd"
                      />
                      <path
                        fill-rule="evenodd"
                        d="M14.354 5.646a.5.5 0 010 .708l-8 8a.5.5 0 01-.708-.708l8-8a.5.5 0 01.708 0z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
              </td>
            </tr>
            <tr>
              <td>8</td>
              <td>Mary</td>
              <td>Moe</td>
              <td>mary@example.com</td>
              <td>
                <div class="btn-group btn-group-sm">
                  <button
                    type="button"
                    class="btn btn-primary"
                    data-toggle="tooltip"
                    data-placement="top"
                    title="Visualizar!"
                  >
                    <svg
                      class="bi bi-eye"
                      width="25"
                      height="25"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M18 10s-3-5.5-8-5.5S2 10 2 10s3 5.5 8 5.5 8-5.5 8-5.5zM3.173 10a13.133 13.133 0 001.66 2.043C6.12 13.332 7.88 14.5 10 14.5c2.12 0 3.879-1.168 5.168-2.457A13.133 13.133 0 0016.828 10a13.133 13.133 0 00-1.66-2.043C13.879 6.668 12.119 5.5 10 5.5c-2.12 0-3.879 1.168-5.168 2.457A13.133 13.133 0 003.172 10z"
                        clip-rule="evenodd"
                      />
                      <path
                        fill-rule="evenodd"
                        d="M10 7.5a2.5 2.5 0 100 5 2.5 2.5 0 000-5zM6.5 10a3.5 3.5 0 117 0 3.5 3.5 0 01-7 0z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </button>
                  <button
                    type="button"
                    class="btn btn-success"
                    data-toggle="tooltip"
                    data-placement="top"
                    title="Editar!"
                  >
                    <svg
                      class="bi bi-pencil"
                      width="25"
                      height="25"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M13.293 3.293a1 1 0 011.414 0l2 2a1 1 0 010 1.414l-9 9a1 1 0 01-.39.242l-3 1a1 1 0 01-1.266-1.265l1-3a1 1 0 01.242-.391l9-9zM14 4l2 2-9 9-3 1 1-3 9-9z"
                        clip-rule="evenodd"
                      />
                      <path
                        fill-rule="evenodd"
                        d="M14.146 8.354l-2.5-2.5.708-.708 2.5 2.5-.708.708zM5 12v.5a.5.5 0 00.5.5H6v.5a.5.5 0 00.5.5H7v.5a.5.5 0 00.5.5H8v-1.5a.5.5 0 00-.5-.5H7v-.5a.5.5 0 00-.5-.5H5z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </button>
                  <button
                    type="button"
                    class="btn btn-danger"
                    data-toggle="tooltip"
                    data-placement="top"
                    title="Excluir!"
                  >
                    <svg
                      class="bi bi-x"
                      width="25"
                      height="25"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M5.646 5.646a.5.5 0 000 .708l8 8a.5.5 0 00.708-.708l-8-8a.5.5 0 00-.708 0z"
                        clip-rule="evenodd"
                      />
                      <path
                        fill-rule="evenodd"
                        d="M14.354 5.646a.5.5 0 010 .708l-8 8a.5.5 0 01-.708-.708l8-8a.5.5 0 01.708 0z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
              </td>
            </tr>
            <tr>
              <td>9</td>
              <td>July</td>
              <td>Dooley</td>
              <td>july@example.com</td>
              <td>
                <div class="btn-group btn-group-sm">
                  <button
                    type="button"
                    class="btn btn-primary"
                    data-toggle="tooltip"
                    data-placement="top"
                    title="Visualizar!"
                  >
                    <svg
                      class="bi bi-eye"
                      width="25"
                      height="25"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M18 10s-3-5.5-8-5.5S2 10 2 10s3 5.5 8 5.5 8-5.5 8-5.5zM3.173 10a13.133 13.133 0 001.66 2.043C6.12 13.332 7.88 14.5 10 14.5c2.12 0 3.879-1.168 5.168-2.457A13.133 13.133 0 0016.828 10a13.133 13.133 0 00-1.66-2.043C13.879 6.668 12.119 5.5 10 5.5c-2.12 0-3.879 1.168-5.168 2.457A13.133 13.133 0 003.172 10z"
                        clip-rule="evenodd"
                      />
                      <path
                        fill-rule="evenodd"
                        d="M10 7.5a2.5 2.5 0 100 5 2.5 2.5 0 000-5zM6.5 10a3.5 3.5 0 117 0 3.5 3.5 0 01-7 0z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </button>
                  <button
                    type="button"
                    class="btn btn-success"
                    data-toggle="tooltip"
                    data-placement="top"
                    title="Editar!"
                  >
                    <svg
                      class="bi bi-pencil"
                      width="25"
                      height="25"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M13.293 3.293a1 1 0 011.414 0l2 2a1 1 0 010 1.414l-9 9a1 1 0 01-.39.242l-3 1a1 1 0 01-1.266-1.265l1-3a1 1 0 01.242-.391l9-9zM14 4l2 2-9 9-3 1 1-3 9-9z"
                        clip-rule="evenodd"
                      />
                      <path
                        fill-rule="evenodd"
                        d="M14.146 8.354l-2.5-2.5.708-.708 2.5 2.5-.708.708zM5 12v.5a.5.5 0 00.5.5H6v.5a.5.5 0 00.5.5H7v.5a.5.5 0 00.5.5H8v-1.5a.5.5 0 00-.5-.5H7v-.5a.5.5 0 00-.5-.5H5z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </button>
                  <button
                    type="button"
                    class="btn btn-danger"
                    data-toggle="tooltip"
                    data-placement="top"
                    title="Excluir!"
                  >
                    <svg
                      class="bi bi-x"
                      width="25"
                      height="25"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M5.646 5.646a.5.5 0 000 .708l8 8a.5.5 0 00.708-.708l-8-8a.5.5 0 00-.708 0z"
                        clip-rule="evenodd"
                      />
                      <path
                        fill-rule="evenodd"
                        d="M14.354 5.646a.5.5 0 010 .708l-8 8a.5.5 0 01-.708-.708l8-8a.5.5 0 01.708 0z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
              </td>
            </tr>
            <tr>
              <td>10</td>
              <td>John</td>
              <td>Doe</td>
              <td>john@example.com</td>
              <td>
                <div class="btn-group btn-group-sm">
                  <button
                    type="button"
                    class="btn btn-primary"
                    data-toggle="tooltip"
                    data-placement="top"
                    title="Visualizar!"
                  >
                    <svg
                      class="bi bi-eye"
                      width="25"
                      height="25"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M18 10s-3-5.5-8-5.5S2 10 2 10s3 5.5 8 5.5 8-5.5 8-5.5zM3.173 10a13.133 13.133 0 001.66 2.043C6.12 13.332 7.88 14.5 10 14.5c2.12 0 3.879-1.168 5.168-2.457A13.133 13.133 0 0016.828 10a13.133 13.133 0 00-1.66-2.043C13.879 6.668 12.119 5.5 10 5.5c-2.12 0-3.879 1.168-5.168 2.457A13.133 13.133 0 003.172 10z"
                        clip-rule="evenodd"
                      />
                      <path
                        fill-rule="evenodd"
                        d="M10 7.5a2.5 2.5 0 100 5 2.5 2.5 0 000-5zM6.5 10a3.5 3.5 0 117 0 3.5 3.5 0 01-7 0z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </button>
                  <button
                    type="button"
                    class="btn btn-success"
                    data-toggle="tooltip"
                    data-placement="top"
                    title="Editar!"
                  >
                    <svg
                      class="bi bi-pencil"
                      width="25"
                      height="25"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M13.293 3.293a1 1 0 011.414 0l2 2a1 1 0 010 1.414l-9 9a1 1 0 01-.39.242l-3 1a1 1 0 01-1.266-1.265l1-3a1 1 0 01.242-.391l9-9zM14 4l2 2-9 9-3 1 1-3 9-9z"
                        clip-rule="evenodd"
                      />
                      <path
                        fill-rule="evenodd"
                        d="M14.146 8.354l-2.5-2.5.708-.708 2.5 2.5-.708.708zM5 12v.5a.5.5 0 00.5.5H6v.5a.5.5 0 00.5.5H7v.5a.5.5 0 00.5.5H8v-1.5a.5.5 0 00-.5-.5H7v-.5a.5.5 0 00-.5-.5H5z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </button>
                  <button
                    type="button"
                    class="btn btn-danger"
                    data-toggle="tooltip"
                    data-placement="top"
                    title="Excluir!"
                  >
                    <svg
                      class="bi bi-x"
                      width="25"
                      height="25"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M5.646 5.646a.5.5 0 000 .708l8 8a.5.5 0 00.708-.708l-8-8a.5.5 0 00-.708 0z"
                        clip-rule="evenodd"
                      />
                      <path
                        fill-rule="evenodd"
                        d="M14.354 5.646a.5.5 0 010 .708l-8 8a.5.5 0 01-.708-.708l8-8a.5.5 0 01.708 0z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
              </td>
            </tr>
            <tr>
              <td>11</td>
              <td>Mary</td>
              <td>Moe</td>
              <td>mary@example.com</td>
              <td>
                <div class="btn-group btn-group-sm">
                  <button
                    type="button"
                    class="btn btn-primary"
                    data-toggle="tooltip"
                    data-placement="top"
                    title="Visualizar!"
                  >
                    <svg
                      class="bi bi-eye"
                      width="25"
                      height="25"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M18 10s-3-5.5-8-5.5S2 10 2 10s3 5.5 8 5.5 8-5.5 8-5.5zM3.173 10a13.133 13.133 0 001.66 2.043C6.12 13.332 7.88 14.5 10 14.5c2.12 0 3.879-1.168 5.168-2.457A13.133 13.133 0 0016.828 10a13.133 13.133 0 00-1.66-2.043C13.879 6.668 12.119 5.5 10 5.5c-2.12 0-3.879 1.168-5.168 2.457A13.133 13.133 0 003.172 10z"
                        clip-rule="evenodd"
                      />
                      <path
                        fill-rule="evenodd"
                        d="M10 7.5a2.5 2.5 0 100 5 2.5 2.5 0 000-5zM6.5 10a3.5 3.5 0 117 0 3.5 3.5 0 01-7 0z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </button>
                  <button
                    type="button"
                    class="btn btn-success"
                    data-toggle="tooltip"
                    data-placement="top"
                    title="Editar!"
                  >
                    <svg
                      class="bi bi-pencil"
                      width="25"
                      height="25"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M13.293 3.293a1 1 0 011.414 0l2 2a1 1 0 010 1.414l-9 9a1 1 0 01-.39.242l-3 1a1 1 0 01-1.266-1.265l1-3a1 1 0 01.242-.391l9-9zM14 4l2 2-9 9-3 1 1-3 9-9z"
                        clip-rule="evenodd"
                      />
                      <path
                        fill-rule="evenodd"
                        d="M14.146 8.354l-2.5-2.5.708-.708 2.5 2.5-.708.708zM5 12v.5a.5.5 0 00.5.5H6v.5a.5.5 0 00.5.5H7v.5a.5.5 0 00.5.5H8v-1.5a.5.5 0 00-.5-.5H7v-.5a.5.5 0 00-.5-.5H5z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </button>
                  <button
                    type="button"
                    class="btn btn-danger"
                    data-toggle="tooltip"
                    data-placement="top"
                    title="Excluir!"
                  >
                    <svg
                      class="bi bi-x"
                      width="25"
                      height="25"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M5.646 5.646a.5.5 0 000 .708l8 8a.5.5 0 00.708-.708l-8-8a.5.5 0 00-.708 0z"
                        clip-rule="evenodd"
                      />
                      <path
                        fill-rule="evenodd"
                        d="M14.354 5.646a.5.5 0 010 .708l-8 8a.5.5 0 01-.708-.708l8-8a.5.5 0 01.708 0z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
              </td>
            </tr>
            <tr>
              <td>12</td>
              <td>July</td>
              <td>Dooley</td>
              <td>july@example.com</td>
              <td>
                <div class="btn-group btn-group-sm">
                  <button
                    type="button"
                    class="btn btn-primary"
                    data-toggle="tooltip"
                    data-placement="top"
                    title="Visualizar!"
                  >
                    <svg
                      class="bi bi-eye"
                      width="25"
                      height="25"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M18 10s-3-5.5-8-5.5S2 10 2 10s3 5.5 8 5.5 8-5.5 8-5.5zM3.173 10a13.133 13.133 0 001.66 2.043C6.12 13.332 7.88 14.5 10 14.5c2.12 0 3.879-1.168 5.168-2.457A13.133 13.133 0 0016.828 10a13.133 13.133 0 00-1.66-2.043C13.879 6.668 12.119 5.5 10 5.5c-2.12 0-3.879 1.168-5.168 2.457A13.133 13.133 0 003.172 10z"
                        clip-rule="evenodd"
                      />
                      <path
                        fill-rule="evenodd"
                        d="M10 7.5a2.5 2.5 0 100 5 2.5 2.5 0 000-5zM6.5 10a3.5 3.5 0 117 0 3.5 3.5 0 01-7 0z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </button>
                  <button
                    type="button"
                    class="btn btn-success"
                    data-toggle="tooltip"
                    data-placement="top"
                    title="Editar!"
                  >
                    <svg
                      class="bi bi-pencil"
                      width="25"
                      height="25"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M13.293 3.293a1 1 0 011.414 0l2 2a1 1 0 010 1.414l-9 9a1 1 0 01-.39.242l-3 1a1 1 0 01-1.266-1.265l1-3a1 1 0 01.242-.391l9-9zM14 4l2 2-9 9-3 1 1-3 9-9z"
                        clip-rule="evenodd"
                      />
                      <path
                        fill-rule="evenodd"
                        d="M14.146 8.354l-2.5-2.5.708-.708 2.5 2.5-.708.708zM5 12v.5a.5.5 0 00.5.5H6v.5a.5.5 0 00.5.5H7v.5a.5.5 0 00.5.5H8v-1.5a.5.5 0 00-.5-.5H7v-.5a.5.5 0 00-.5-.5H5z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </button>
                  <button
                    type="button"
                    class="btn btn-danger"
                    data-toggle="tooltip"
                    data-placement="top"
                    title="Excluir!"
                  >
                    <svg
                      class="bi bi-x"
                      width="25"
                      height="25"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M5.646 5.646a.5.5 0 000 .708l8 8a.5.5 0 00.708-.708l-8-8a.5.5 0 00-.708 0z"
                        clip-rule="evenodd"
                      />
                      <path
                        fill-rule="evenodd"
                        d="M14.354 5.646a.5.5 0 010 .708l-8 8a.5.5 0 01-.708-.708l8-8a.5.5 0 01.708 0z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import $ from "jquery";
import "datatables.net-bs4/js/dataTables.bootstrap4.min.js";
export default {
  mounted() {
    $(document).ready(function() {
      $('[data-toggle="tooltip"]').tooltip()
      $("#table_id").DataTable({
        columnDefs: [{ orderable: false, targets: 4 }, { searchable: true, targets: 0 }],
        lengthMenu: [
          [5, 10, 25, 50, -1],
          [5, 10, 25, 50, "All"]
        ],
        "lengthChange": false,
        // "searching": false,
        "info": false,
        // "pagingType": "full_numbers",
        language: {
          sEmptyTable: "Nenhum registro encontrado",
          sInfo: "Mostrando de _START_ até _END_ de _TOTAL_ registros",
          sInfoEmpty: "Mostrando 0 até 0 de 0 registros",
          sInfoFiltered: "(Filtrados de _MAX_ registros)",
          sInfoPostFix: "",
          sInfoThousands: ".",
          sLengthMenu: "_MENU_ resultados por página",
          sLoadingRecords: "Carregando...",
          sProcessing: "Processando...",
          sZeroRecords: "Nenhum registro encontrado",
          sSearch: "Pesquisar",
          paginate: {
            sNext: "Próximo",
            sPrevious: "Anterior",
            sFirst: "Primeiro",
            sLast: "Último"
          },
          oAria: {
            sSortAscending: ": Ordenar colunas de forma ascendente",
            sSortDescending: ": Ordenar colunas de forma descendente"
          },
          select: {
            rows: {
              _: "Selecionado %d linhas",
              "0": "Nenhuma linha selecionada",
              "1": "Selecionado 1 linha"
            }
          }
        }
      });
    });
  }
};
</script>

<style scoped>
.btn-purple {
  background-color: #6f42c1;
}
</style>