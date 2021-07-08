const getCookie = (name) => {
  const cookies = "; " + document.cookie;
  const getId = cookies.split(`; ${name}=`);
  if (getId.length === 2) {
    return getId.pop().split(";").shift();
  }
};

const setCookie = (name, value, exp = 3) => {
  const expires = exp * 1000 * 60 * 60 * 24;
  const date = new Date().getTime();
  const inputValue = expires + date;
  const getDate = new Date(inputValue).toUTCString();

  document.cookie = `${name} = ${value} ; expires=${getDate};`;
};

const delCookie = (name) => {
  let date = new Date("2020-01-01").toUTCString();

  document.cookie = name + `=; expires=${date}`;
};

export { getCookie, setCookie, delCookie };
