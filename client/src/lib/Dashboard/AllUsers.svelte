<script>
	import { onMount } from "svelte";
	import { api } from "../../api/Api";
	import { notificationCenter } from "../../config/notification";

  let users = []

  onMount(async () => {
    api.findAllUsers().then(res => {
      users = res.data;
    }).catch(err => {
      notificationCenter.displayErrorNotification("Failed to fetch all users");
    })
  })
</script>

<div>
  <h1 class="font-bold text-xl mb-4">Manage Users</h1>
  <div class="overflow-x-auto">
    <table class="table w-full">
      <!-- head -->
      <thead>
        <tr>
          <th>Username</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {#each users as user}
           <tr>
            <td>{user.username}</td>
            <td>
              <button class="btn btn-sm btn-info">Edit</button>
              <button class="btn btn-sm btn-error">Delete</button>
            </td>
           </tr>
        {/each}
      </tbody>
    </table>
  </div>
</div>

<style>
  /* your styles go here */
</style>

<!-- markup (zero or more items) goes here -->