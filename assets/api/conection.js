var myHeaders = new Headers();
myHeaders.append("x-rapidapi-key", "4b5cc1298fd10a3fe5df4508a35f9ad0");
myHeaders.append("x-rapidapi-host", "v3.football.api-sports.io");

var requestOptions = {
  method: "GET",
  headers: myHeaders,
  redirect: "follow",
};

function api() {
  return fetch("https://v3.football.api-sports.io/fixtures?live=all", requestOptions);
}

async function conection() {
  try {
    const response = await api();
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error);
    }
    console.log(data);
    return data;
  } catch (error) {
    console.error(error);
  }
}

export { conection };
