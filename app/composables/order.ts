export function useOrder(){

       const orderItem = useState<TOrder>("order-item",() =>({
                            dogId: "",
                            customerName: "",
                            email: "",
                            contactNumber: "",
                            deliveryMethod: "Pickup",
                            address: "",
                            status: "Pending Verification"
                           
                        }))

    function getAll( page = 1, limit = 10, search = ""){
        return $fetch<{items:TOrder[], pages:number, pageRange:string}>('/api/order',   {
            method:"GET",
            query:{page,limit,search}
        })
    }

    function getById(id:string){
        return $fetch<TOrder>(`/api/order/${id}`)
    }

    function add(data:TOrder){
        return $fetch('/api/order',{
            method:"POST",
            body: data
        })
    }

    function updateById(id:string , data:Partial<TOrder>){
        return $fetch(`/api/order/${id}`,{
            method:"PATCH",
            body:data
        })
    }

    function deleteById(id:string){
        return $fetch<TOrder>(`/api/order/${id}`,{
            method:"DELETE",
           
        })
    }

    return{
        orderItem,
        add,
        getById,
        getAll,
        updateById,
        deleteById
    }
}