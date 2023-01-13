<script>
	import { api } from '../../../api/Api';
  import {notificationCenter} from '../../../config/notification'
	import { goto } from '$app/navigation'

  let state = {
    username: '',
    password: '',
    role: '',
    loading: false
  }

  const onRegister = async () => {
    if(!state.username || !state.password || !state.role) {
      notificationCenter.displayErrorNotification("Please fill all required fields");
      return;
    }

    state.loading = true;

    try {
      await api.register({username: state.username, password: state.password, role: state.role});
      notificationCenter.displaySuccessNotification("You are now logged in")
      window.location.href = "/"
    } catch (err) {
      notificationCenter.displayErrorNotification("Username or password incorrect")
    } finally {
      state.loading = false
    }
  }
</script>


<div class="px-8 lg:px-16">
  <div class="flex justify-center items-center mt-20">
    <div class="shadow-md w-96 flex flex-col items-center justify-center p-4">
      <h1 class="font-bold mt-4">Register</h1>
      <div class="w-full mt-4">
        <div class="form-control w-full">
          <label class="label" for="username">
            <span class="label-text">Username: *</span>
          </label>
          <input id="username" type="text" placeholder="John Doe" class="input input-bordered w-full" value={state.username} on:input={(e) => {
            state = {...state, username: e.target.value}
          }} />
        </div>
        <div class="form-control w-full mt-4">
          <label class="label" for="password">
            <span class="label-text">Password: *</span>
          </label>
          <input id="password" type="password" placeholder="•••••••" class="input input-bordered w-full" value={state.password} on:input={(e) => {
            state  = {...state, password: e.target.value}
          }} />
        </div>
        <div class="form-control w-full">
          <label class="label" for="role">
            <span class="label-text">Role</span>
          </label>
          <select id="role" class="select select-bordered" value={state.role} on:change={(e) => {
            state = {...state, role: e.target.value}
          }} >
            <option disabled selected>Pick one</option>
            <option value="user">User</option>
            <option value="admin">Admin</option>
            <option value="superadmin">Super admin</option>
          </select>
        </div>
        <button class="btn btn-primary btn-block mt-4" on:click={onRegister}>{state.loading ? 'Loading...' : 'Register'}</button>
        <div class="mt-8 flex justify-center">
          <a href="/auth/login" class="text-primary">Already have an account yet ? Login</a>
        </div>
      </div>
    </div>
  </div>
</div>

<style>
  /* your styles go here */
</style>