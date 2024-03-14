const delay = ms => new Promise(res => setTimeout(res, ms));

const Start = async () => {
  await delay(300000);
  alert("Goulag beginning in 10 seconds!!!");
  await delay(10000);
  location.href = "quizzgoulag.html";
};

Start();