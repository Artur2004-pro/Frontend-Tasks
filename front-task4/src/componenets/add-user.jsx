import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const AddUser = () => {
    const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const submit = async (data) => {
    console.log(data);

    const response = await axios.post("http://localhost:4002/users", data);
    console.log("User created:", response.data);
    reset();
    navigate("/")
};

  return (
    <form onSubmit={handleSubmit(submit)}>
      <label>name</label>
      <input
        {...register("name", { required: "name is required" })}
        type="text"
      />
      {errors.name && <p style={{ color: "red" }}>{errors.name.message}</p>}

      <label>age</label>
      <input
        {...register("age", {
          required: "age is required",
          valueAsNumber: true,
          min: { value: 0, message: "age must be positive" },
        })}
        type="number"
      />
      {errors.age && <p style={{ color: "red" }}>{errors.age.message}</p>}

      <button type="submit">save</button>
    </form>
  );
};

export default AddUser;
