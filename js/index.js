import { api_url, courses } from "./config.js";

let cs = new String(`<option value=''>Seleccione um curso</option>`);

for (const { id, label } of courses) {
  cs += `<option value='${id}'>${label}</option>`;
}

document.getElementById("select-course").innerHTML = cs;

document
  .getElementById("form-cadastro")
  .addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const course = formData.get("select-course");
    const bi = formData.get("bi");
    const email = formData.get("email");
    const tel1 = formData.get("tel-1");
    const birthday = formData.get("birthday");
    const morada = formData.get("morada");
    const last_name = formData.get("last-name");
    const first_name = formData.get("first-name");
    const e_tel1 = formData.get("e-tel-1");
    const level = formData.get("select-level");

    if (!level) {
      alert("Seleccione o nível");
      return;
    }

    if (!course) {
      alert("Seleccione o curso");
      return;
    }

    const data = {
      course,
      bi,
      email,
      tel1,
      birthday,
      morada,
      last_name,
      first_name,
      e_tel1,
      level,
    };

    try {
      document.getElementById("btn-submit").disabled = true;
      const req = await fetch(api_url + "/foco-cadastro/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (req.status === 200) {
        const res = await req.json();
        document.getElementById("btn-submit").disabled = false;
        alert(`Estudante (${res.created_at.slice(-6)}) cadastrado com sucesso!`);
      }
    } catch (error) {
      console.log("Error fetching!");
      console.log(error);
      document.getElementById("btn-submit").disabled = false;
    }
  });
