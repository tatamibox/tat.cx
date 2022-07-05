import './SignUpForm.css'
const SignUpForm = () => {
return (
    <div class="form__container">
    <form class="form-inline newUserForm" action="/sex" method="POST">
  <label class="sr-only" for="inlineFormInputName2">Name</label>
  <input type="text" class="form-control mb-2 mr-sm-2" id="inlineFormInputName2" placeholder="Jane Doe" name="fullname"/>

  <label class="sr-only" for="inlineFormInputGroupUsername2">Username</label>
  <div class="input-group mb-2 mr-sm-2">
    <div class="input-group-prepend">
      <div class="input-group-text">tat.cx/</div>
    </div>
    <input type="text" class="form-control" id="inlineFormInputGroupUsername2" placeholder="Username" name="username"/>
  </div>
  <label class="sr-only" for="password">Password</label>
  <div class="input-group mb-2 mr-sm-2">
    <input type="text" class="form-control" id="password" placeholder="Password" name="password" />
  </div>

  <div class="form-check mb-2 mr-sm-2">
    <input class="form-check-input" type="checkbox" id="inlineFormCheck" />
    <label class="form-check-label" for="inlineFormCheck">
      Remember me
    </label>
  </div>

  <button type="submit" class="btn btn-primary mb-2">Submit</button>
</form>
        </div>
)
}

export default SignUpForm;