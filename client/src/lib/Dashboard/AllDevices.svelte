<script>
	import { onMount } from "svelte";
	import { api } from "../../api/Api";
	import { notificationCenter } from "../../config/notification";

  let allDevices = []
  let createDeviceModalOpened = false;
  let editDeviceModalOpened = false;

  let selectedDevice = null;

  let loading = false;

  let deviceState = {
    device_name: '',
    device_description: '',
    latitude: '',
    longitude: ''
  }

  const getDevices = async () => {
    loading = true
    api.getDevices().then(res => {
      allDevices = res.data
      loading = false
    }).catch(err => {
      notificationCenter.displayErrorNotification("Failed to fetch all devices")
      loading = false
    })
  }
  
  onMount(() => {
    getDevices();
  })

  const openModal = () => {
    createDeviceModalOpened = true
  }

  const closeModal = () => {
    createDeviceModalOpened = false
  }

  const onAddNewDevice = async () => {
    if(!deviceState.device_name || !deviceState.device_description || !deviceState.latitude || !deviceState.longitude) {
      notificationCenter.displayErrorNotification("All fields are required");
      return;
    }

    loading = true;
    
    try {
      await api.createDevice(deviceState);
      notificationCenter.displaySuccessNotification("Device added successfully");
      createDeviceModalOpened = false;
      getDevices();
    } catch(err) {
      notificationCenter.displayErrorNotification("Failed to add new device");
    }finally {
      loading = false;
    }
  }

  const onEditDevice = async () => {
    if(!selectedDevice.device_name || !selectedDevice.device_description || !selectedDevice.latitude || !selectedDevice.longitude) {
      notificationCenter.displayErrorNotification("All fields are required");
      return;
    }

    loading = true;
    
    try {
      await api.updateDevice(selectedDevice);
      notificationCenter.displaySuccessNotification("Device updated successfully");
      editDeviceModalOpened = false;
      getDevices();
    } catch(err) {
      notificationCenter.displayErrorNotification("Failed to update device");
    }finally {
      loading = false;
    }
  }

  const openEditModal = (currentDevice) => {
    selectedDevice = currentDevice;
    editDeviceModalOpened = true;
  }

  const closeEditModal = () => {
    editDeviceModalOpened = false;
  }

  const onDeleteDevice = async (currentDevice) => {
    loading = true;
    
    try {
      await api.removeDevice(currentDevice.id);
      notificationCenter.displaySuccessNotification("Device deleted successfully");
      getDevices();
    } catch(err) {
      notificationCenter.displayErrorNotification("Failed to deleted device");
    }finally {
      loading = false;
    }
  }
</script>


<div class="w-full">
  <button class="btn btn-primary mb-8" on:click={openModal}>Add a device</button>
  <h2 class="font-bold text-xl">All device markers</h2>
  <div class="mt-4 w-full">
    <div class="overflow-x-scroll">
      <table class="table table-zebra w-full">
        <!-- head -->
        <thead>
          <tr>
            <th></th>
            <th>Name</th>
            <th>Coordinates</th>
            <th>Enabled</th>
            <th>Status</th>
            <th>Added on</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {#each allDevices as device, index}
             <tr>
              <td>{index}</td>
              <td>{device.device_name}</td>
              <td>{device.latitude} / {device.longitude}</td>
              <td>
                {#if device.enabled}
                  <i class="fa-solid fa-circle-check text-green-600"></i>
                {:else}
                  <i class="fa-solid fa-circle-xmark text-red-600"></i>
                {/if}
              </td>
              <td>{device.status}</td>
              <td>{new Date(device.created_at).toLocaleDateString('fr-FR')}</td>
              <td>
                <button class="btn btn-sm btn-success" on:click={() => openEditModal(device)}>Edit</button>
                <button class="btn btn-sm btn-error" on:click={() => onDeleteDevice(device)}>Delete</button>
              </td>
             </tr>
          {/each}
        </tbody>
      </table>
    </div>
  </div>
  <div class="modal" class:modal-open={createDeviceModalOpened} id="my-modal-2">
    <div class="modal-box relative">
      <button for="my-modal-3" class="btn btn-sm btn-circle absolute right-2 top-2" on:click={closeModal}>✕</button>
      <h3 class="text-lg font-bold">Add a new device</h3>
      <hr>
      <div class="mt-4">
        <div class="form-control w-full">
          <label class="label" for="device_name">
            <span class="label-text">Device name</span>
          </label>
          <input id="device_name" type="text" placeholder="Device 01" class="input input-bordered w-full" value={deviceState.device_name} on:input={(e) => {
            deviceState = {...deviceState, device_name: e.target.value}
          }} />
        </div>
        <div class="form-control w-full">
          <label class="label" for="device_description">
            <span class="label-text">Description</span>
          </label>
          <input id="device_description" type="text" placeholder="This is a new device" class="input input-bordered w-full" value={deviceState.device_description} on:input={(e) => {
            deviceState = {...deviceState, device_description: e.target.value}
          }} />
        </div>
        <div class="grid grid-cols-2 gap-2">
          <div class="form-control w-full">
            <label class="label" for="lat">
              <span class="label-text">Latitude</span>
            </label>
            <input id="lat" type="text" placeholder="0" class="input input-bordered w-full" value={deviceState.latitude} on:input={(e) => {
              deviceState = {...deviceState, latitude: e.target.value}
            }} />
          </div>
          <div class="form-control w-full">
            <label class="label" for="lng">
              <span class="label-text">Longitude</span>
            </label>
            <input id="lng" type="text" placeholder="0" class="input input-bordered w-full" value={deviceState.longitude} on:input={(e) => {
              deviceState = {...deviceState, longitude: e.target.value}
            }} />
          </div>
        </div>

        <button class="btn btn-primary mt-4 btn-block" on:click={onAddNewDevice}>Add</button>
      </div>
    </div>
  </div>
  <!-- edit device modal -->
  <div class="modal" class:modal-open={editDeviceModalOpened} id="my-modal-2">
    <div class="modal-box relative">
      <button for="my-modal-3" class="btn btn-sm btn-circle absolute right-2 top-2" on:click={closeEditModal}>✕</button>
      <h3 class="text-lg font-bold">Edit device</h3>
      <hr>
      <div class="mt-4">
        <div class="form-control w-full">
          <label class="label" for="device_name">
            <span class="label-text">Device name</span>
          </label>
          <input id="device_name" type="text" placeholder="Device 01" class="input input-bordered w-full" value={selectedDevice?.device_name} on:input={(e) => {
            selectedDevice = {...selectedDevice, device_name: e.target.value}
          }} />
        </div>
        <div class="form-control w-full">
          <label class="label" for="device_description">
            <span class="label-text">Description</span>
          </label>
          <input id="device_description" type="text" placeholder="This is a new device" class="input input-bordered w-full" value={selectedDevice?.device_description} on:input={(e) => {
            selectedDevice = {...selectedDevice, device_description: e.target.value}
          }} />
        </div>
        <div class="grid grid-cols-2 gap-2">
          <div class="form-control w-full">
            <label class="label" for="lat">
              <span class="label-text">Latitude</span>
            </label>
            <input id="lat" type="text" placeholder="0" class="input input-bordered w-full" value={selectedDevice?.latitude} on:input={(e) => {
              selectedDevice = {...selectedDevice, latitude: e.target.value}
            }} />
          </div>
          <div class="form-control w-full">
            <label class="label" for="lng">
              <span class="label-text">Longitude</span>
            </label>
            <input id="lng" type="text" placeholder="0" class="input input-bordered w-full" value={selectedDevice?.longitude} on:input={(e) => {
              selectedDevice = {...selectedDevice, longitude: e.target.value}
            }} />
          </div>
          <div class="form-control w-full">
            <label class="label" for="enabled">
              <span class="label-text">Enabled</span>
            </label>
            <select id="enabled" class="select select-bordered" value={selectedDevice?.enabled} on:change={(e) => {
              selectedDevice = {...selectedDevice, enabled: e.target.value}
            }}>
              <option value={true}>Yes</option>
              <option value={false}>No</option>
            </select>
          </div>
          <div class="form-control w-full">
            <label class="label" for="status">
              <span class="label-text">Status</span>
            </label>
            <select id="status" class="select select-bordered" value={selectedDevice?.status} on:change={(e) => {
              selectedDevice = {...selectedDevice, status: e.target.value}
            }}>
              <option value="offline">OFFLINE</option>
              <option value="online">ONLINE</option>
            </select>
          </div>
        </div>

        <button class="btn btn-primary mt-4 btn-block" on:click={onEditDevice}>Edit</button>
      </div>
    </div>
  </div>
</div>

<style>
  /* your styles go here */
</style>

<!-- markup (zero or more items) goes here -->