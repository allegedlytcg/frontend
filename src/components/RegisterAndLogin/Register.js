import React, { useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import Amplify, { Auth } from "aws-amplify";
// import config from "../../aws-exports"

// Amplify.configure(config);
Amplify.configure({
  Auth: {
    // REQUIRED only for Federated Authentication - Amazon Cognito Identity Pool ID
    identityPoolId: "us-east-2_XjY6GT3QY",

    // REQUIRED - Amazon Cognito Region
    region: "us-east-2",
    
      aws_project_region: "us-east-2",
      aws_cognito_identity_pool_id: "us-east-2:fe1c382c-1179-4318-8105-3a4852dd2e9b",
      aws_cognito_region: "us-east-2",
      aws_user_pools_id: "us-east-2_Kl25w6ieQ",
      aws_user_pools_web_client_id: "474ugf0pfpdoag0qf81nigrhne",
      oauth: {
          domain: "frontende60f844c-e60f844c-dev.auth.us-east-2.amazoncognito.com",
          scope: [
              "phone",
              "email",
              "openid",
              "profile",
              "aws.cognito.signin.user.admin"
          ],
          redirectSignIn: "https://cognito.d2hdukfixal4k9.amplifyapp.com/registerandlogin/",
          redirectSignOut: "https://cognito.d2hdukfixal4k9.amplifyapp.com/registerandlogin/",
          responseType: "code"
      },
      federationTarget: "COGNITO_USER_POOLS"

  
  },
});

const currentConfig = Auth.configure();

const Register = () => {
  const history = useHistory();
  const [user, setUser] = useState({
    name: "",
    password: "",
  });

  const userInput = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  // const userRegistration = (e) => {
  // 	e.preventDefault();
  // 	try {

  // 		const {user} =  Auth.signUp({
  // 			username,
  // 			password,
  // 			attributes: {
  // 				email
  // 			}
  // 		})
  // 		console.log(user)
  // 	} catch (err) {
  // 		console.log("error", err)
  // 	}
  // } ;

  const fbLogin = e => {
    e.preventDefault()
     
    Auth.federatedSignIn({ provider: "Facebook" }).then(cred => {
      // If success, you will get the AWS credentials
      console.log(cred);
      return Auth.currentAuthenticatedUser();
  }).then(user => {
      // If success, the user object you passed in Auth.federatedSignIn
      console.log(user);
  }).catch(e => {
      console.log(e)
  });;
    

  }
// looking like we might need another component that's the loging in page that pareses out that code from the url and 
  return (
    <RegisterStyles>
      <h4>Register</h4>
      <form>
        <div className="labelAndInput">
          <label>username</label> <br />
          <input
            name="name"
            placeholder="username"
            type="text"
            onChange={userInput}
            value={user.name}
            autoComplete="off"
          />
        </div>
        <br />
        <div className="labelAndInput">
          <label>password</label> <br />
          <input
            name="password"
            placeholder="password"
            type="password"
            onChange={userInput}
            value={user.password}
            autoComplete="off"
          />
        </div>
        <br />
        <div className="buttonDiv">
          <button>Register</button>
          <button
            onClick={(e) => fbLogin(e)}
         
          >
            Open Facebook
          </button>
        </div>
      </form>
    </RegisterStyles>
  );
};
const RegisterStyles = styled.div`
  align-items: center;
  margin: 5rem 2rem 1rem 1rem;
  /* border: 1px solid blue; */
  border-radius: 14px;
  padding: 2rem;
  background-color: #726ca8;
  color: #fff;
  h4 {
    text-align: center;
  }
  .labelAndInput {
    input {
      border-radius: 0.25rem;
      border-style: none;
      padding: 0.25rem 0.25rem 0.25rem 0.5rem;
    }
  }
  .buttonDiv {
    display: flex;
    justify-content: center;
  }
`;
export default Register;
