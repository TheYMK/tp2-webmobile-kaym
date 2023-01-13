<script>
	import { api } from '../../../api/Api';
  import {notificationCenter} from '../../../config/notification'

  let state = {
    username: '',
    password: '',
    loading: false
  }

  const onLogin = async () => {
    if(!state.username || !state.password) {
      notificationCenter.displayErrorNotification("Please fill all required fields");
      return;
    }

    state.loading = true;

    try {
      await api.signin({username: state.username, password: state.password});
      notificationCenter.displaySuccessNotification("You are now logged in")
      window.location.href = "/"
    }catch (err) {
      notificationCenter.displayErrorNotification("Username or password incorrect")
    } finally {
      state.loading = false
    }

  }
</script>


<div class="px-8 lg:px-16">
  <div class="flex justify-center items-center mt-20">
    <div class="shadow-md w-96 flex flex-col items-center justify-center p-4">
      <h1 class="font-bold mt-4">Login</h1>
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
        <button class="btn btn-primary btn-block mt-4" on:click={onLogin}>{state.loading ? 'Loading...' : 'Login'}</button>
        <div class="mt-8 flex justify-center">
          <a href="/auth/register" class="text-primary">Don't have an account yet ? Register</a>
        </div>
      </div>
    </div>
  </div>
</div>

<style>
  /* your styles go here */
</style>