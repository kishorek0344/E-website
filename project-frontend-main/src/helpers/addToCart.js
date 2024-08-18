import SummaryApi from "../common";
import { toast } from 'react-toastify';


const addToCart = async (e, id) => {
    e?.stopPropagation();
    e?.preventDefault();

    try {
        const response = await fetch(SummaryApi.addToCartProduct.url, {
            method: SummaryApi.addToCartProduct.method,
            credentials: 'include', // This ensures cookies are sent with the request
            headers: {
                "Content-Type": 'application/json',
                'Authorization': `Bearer ${"QWESDSDFFGGHTT^GYUAYUHHJDIJOSHUSDY&SUGSBJSSKLNDNBBSKHUHJUSIJLSIJIJIUBHJSDDS"}`
                
            },
            body: JSON.stringify({ productId: id }),
          
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const responseData = await response.json();

        if (responseData.success) {
            toast.success(responseData.message);
        } else if (responseData.error) {
            toast.error(responseData.message);
        }

        return responseData;

    } catch (error) {
        console.error('Error in addToCart:', error);
        toast.error('An error occurred while adding to cart.');
    }
};


export default addToCart;
