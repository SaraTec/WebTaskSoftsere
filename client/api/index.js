 const getData = async title => {
  try {
    const response = await fetch(`http://localhost:5000/api/${title}`);
    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

 const postData = async (title, formData) => {
  try {
    const response = await fetch(`http://localhost:5000/api/${title}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
    });
    return await response.json();
  } catch (error) {
    console.log(error);
  }
};


