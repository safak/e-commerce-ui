import { PaymentFormInputs, paymentFormSchema} from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, ShoppingCart } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";



const PaymentForm = () => {
  const {
    register,
    handleSubmit,
    formState:{errors}
  } = useForm<PaymentFormInputs>({
    resolver: zodResolver(paymentFormSchema),
  });
  const router = useRouter();
  const handlePaymentForm: SubmitHandler<PaymentFormInputs> = (data)=>{
    
    
  }
  return (
  <form className="flex flex-col gap-4" onSubmit={handleSubmit(handlePaymentForm)}>
    <div className="flex flex-col gap-1">
      <label htmlFor="cardHolder" className="text-xs text-gray-500 font-medium">
        Name on card
      </label>
      <input
        className="border-b border-gray-200 py-2 outline-none text-sm"
        type="text"
        id="cardHolder"
        placeholder="Zeinab mahmoud"
        {...register("cardHolder")}
      />
      {errors.cardHolder &&(
        <p className="text-xs text-red-500">{errors.cardHolder?.message}</p>
      )}
    </div>

    <div className="flex flex-col gap-1">
      <label htmlFor="cardNumber" className="text-xs text-gray-500 font-medium">
        Card Number
      </label>
      <input
        className="border-b border-gray-200 py-2 outline-none text-sm"
        type="text"
        id="cardNumber"
        placeholder="123456712345678"
        {...register("cardNumber")}
      />
      {errors.cardNumber &&(
        <p className="text-xs text-red-500">{errors.cardNumber?.message}</p>
      )}
    </div>

    <div className="flex flex-col gap-1">
      <label htmlFor="expirationDate" className="text-xs text-gray-500 font-medium">
        Expiration Date
      </label>
      <input
        className="border-b border-gray-200 py-2 outline-none text-sm"
        type="text"
        id="expirationDate"
        placeholder="01/22"
        {...register("expirationDate")}
      />
      {errors.expirationDate &&(
        <p className="text-xs text-red-500">{errors.expirationDate?.message}</p>
      )}
    </div>

    <div className="flex flex-col gap-1">
      <label htmlFor="cvv" className="text-xs text-gray-500 font-medium">
        CVV
      </label>
      <input
        className="border-b border-gray-200 py-2 outline-none text-sm"
        type="text"
        id="cvv"
        placeholder="123"
        {...register("cvv")}
      />
      {errors.cvv &&(
        <p className="text-xs text-red-500">{errors.cvv?.message}</p>
      )}


    </div>
    
    <div className="flex items-center gap-2 mt-4">
      <Image src="/klarna.png" alt="klarna" width={50} height={25} className="rounded-md"/>
      <Image src="/cards.png" alt="cards" width={50} height={25} className="rounded-md"/>
      <Image src="/stripe.png" alt="stripe" width={50} height={25} className="rounded-md"/>


    </div>

    <button 
      type="submit"
      className="w-full bg-gray-800 hover:bg-gray-900 transition-all duration-300 text-white flex items-center justify-center gap-2 rounded-lg p-2 cursor-pointer">
          Checkout
          <ShoppingCart className="w-3 h-3"/>
    </button>




  </form>
  );
}
export default PaymentForm;