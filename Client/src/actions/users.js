import axios from "axios";

export const getUser = () => async (dispatch) => {
  try {
    dispatch({
      type: "GET_USER_REQUEST",
    });

    const { data } = await axios.get("/api/v1/user");

    dispatch({
      type: "GET_USER_SUCCESS",
      payload: data.user,
    });
  } catch (error) {
    dispatch({
      type: "GET_USER_FAILURE",
      payload: error.response.data.message,
    });
  }
};

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: "LOGIN_REQUEST",
    });

    const { data } = await axios.post(
      "/api/v1/login",
      {
        email,
        password,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    dispatch({
      type: "LOGIN_SUCCESS",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "LOGIN_FAILURE",
      payload: error.response.data.message,
    });
  }
};

export const logout = () => async (dispatch) => {
  try {
    dispatch({
      type: "LOGOUT_REQUEST",
    });

    const { data } = await axios.get("/api/v1/logout");

    dispatch({
      type: "LOGOUT_SUCCESS",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "LOGOUT_FAILURE",
      payload: error.response.data.message,
    });
  }
};

export const loadUser = () => async (dispatch) => {
  try {
    dispatch({
      type: "LOAD_USER_REQUEST",
    });

    const { data } = await axios.get("/api/v1/me");

    dispatch({
      type: "LOAD_USER_SUCCESS",
      payload: data.user,
    });
  } catch (error) {
    dispatch({
      type: "LOAD_USER_FAILURE",
      payload: error.response.data.message,
    });
  }
};

export const updateUser =(name, email, password,about) => async (dispatch) => {
    try {
      dispatch({
        type: "UPDATE_USER_REQUEST",
      });

      const { data } = await axios.put(
        "/api/v1/admin/update",
        {
          name,
          email,
          password,
          about,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      dispatch({
        type: "UPDATE_USER_SUCCESS",
        payload: data.message,
      });
    } catch (error) {
      dispatch({
        type: "UPDATE_USER_FAILURE",
        payload: error.response.data.message,
      });
    }
  };



// Add Skills Action
  export const addSkills = (title, subtitle, picture) => async (dispatch) => {
    try {
      dispatch({ type: "ADD_SKILLS_REQUEST" });
  
      const formData = new FormData();
      formData.append('title', title);
      formData.append('subtitle', subtitle);
      formData.append('picture', picture);
  
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };
  
      const { data } = await axios.post(
        "/api/v1/admin/skills/add",
        formData,
        config
      );
  
      dispatch({
        type: "ADD_SKILLS_SUCCESS",
        payload: data.message,
      });
    } catch (error) {
      dispatch({
        type: "ADD_SKILLS_FAILURE",
        payload: error.response.data.message,
      });
    }
  };
  
  export const addYoutube = (heading, title, subtitle, captures, viewUrl) => async (dispatch) => {
    try {
      // Dispatch the request action
      dispatch({
        type: "ADD_YOUTUBE_REQUEST",
      });
  
      // Create a FormData object and append the necessary fields
      const formData = new FormData();
      formData.append('heading', heading);
      formData.append('title', title);
      formData.append('subtitle', subtitle);
      formData.append('captures', captures);
      formData.append('viewUrl', viewUrl);
  
      // Define the config for the request, specifying the content type
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };
  
      // Make the POST request to add the YouTube video
      const { data } = await axios.post(
        "/api/v1/admin/youtube/add",
        formData,
        config
      );
  
      // Dispatch the success action with the response data
      dispatch({
        type: "ADD_YOUTUBE_SUCCESS",
        payload: data.message,
      });
    } catch (error) {
      // Dispatch the failure action with the error message
      dispatch({
        type: "ADD_YOUTUBE_FAILURE",
        payload: error.response?.data?.message || error.message,
      });
    }
  };

  // Add Project Action
  export const addProject = (heading, title, subtitle, captures, viewUrl) => async (dispatch) => {
    try {
      // Dispatch the request action
      dispatch({
        type: "ADD_YOUTUBE_REQUEST",
      });
  
      // Create a FormData object and append the necessary fields
      const formData = new FormData();
      formData.append('heading', heading);
      formData.append('title', title);
      formData.append('subtitle', subtitle);
      formData.append('captures', captures);
      formData.append('viewUrl', viewUrl);
  
      // Define the config for the request, specifying the content type
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };
  
      // Make the POST request to add the YouTube video
      const { data } = await axios.post(
        "/api/v1/admin/project/add",
        formData,
        config
      );
  
      // Dispatch the success action with the response data
      dispatch({
        type: "ADD_YOUTUBE_SUCCESS",
        payload: data.message,
      });
    } catch (error) {
      // Dispatch the failure action with the error message
      dispatch({
        type: "ADD_YOUTUBE_FAILURE",
        payload: error.response?.data?.message || error.message,
      });
    }
  };
  


export const addGallery = (title, photograph) => async (dispatch) => {
  try {
    // Dispatch the request action
    dispatch({
      type: "ADD_GALLERY_REQUEST",
    });

    // Create a FormData object and append the necessary fields
    const formData = new FormData();
    formData.append('title', title);
    formData.append('photograph', photograph);

    // Define the config for the request, specifying the content type
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };

    // Make the POST request to add the gallery image
    const { data } = await axios.post(
      "/api/v1/admin/gallery/add",
      formData,
      config
    );

    // Dispatch the success action with the response data
    dispatch({
      type: "ADD_GALLERY_SUCCESS",
      payload: data.message,
    });
  } catch (error) {
    // Dispatch the failure action with the error message
    dispatch({
      type: "ADD_GALLERY_FAILURE",
      payload: error.response?.data?.message || error.message,
    });
  }
};

  export const deleteProject = (projectId) => async (dispatch) => {
    try {
      dispatch({
        type: "DELETE_PROJECT_REQUEST",
      });
  
      const { data } = await axios.delete(`/api/v1/admin/project/delete/${projectId}`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      dispatch({
        type: "DELETE_PROJECT_SUCCESS",
        payload: data.message,
      });
    } catch (error) {
      dispatch({
        type: "DELETE_PROJECT_FAILURE",
        payload: error.response.data.message,
      });
    }
  };