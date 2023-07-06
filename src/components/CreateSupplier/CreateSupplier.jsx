import { useForm} from "react-hook-form"
import { createSupplier } from '../../services/Services'
import './CreateSupplier.scss'

const CreateSupplier = () => {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
      } = useForm();

      const onSubmit = (data) => {
        console.log(data);
        createSupplier(data)
          .then((res) => {
            console.log(res);
          })
          .catch((error) => {
            console.log("no se ha guardado el supplier ", error);
          });
      };
      console.log(watch("example"));

  return (
    <div>
    <form  onSubmit={handleSubmit(onSubmit)}>
        <label>Provider: </label>
        <input type="text"  {...register("name", { required: true })}/>
        {errors.name && <p className="form-error">Field required, please enter a valid code</p>}
      <br />
      <label>Country: </label>
        <input type="text"   {...register("country", { required: true })}/>
        {errors.country && <p className="form-error">Field required, please enter a valid code</p>}
      <br />
      <input type="submit" />
    </form>
    </div>
  );
}

export default CreateSupplier
