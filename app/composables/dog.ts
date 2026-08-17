export function useDog(){

const dogItem = useState<TDog>("dog-item", () => ({
  breed: "",
  age: "",
  price: 0,
  gender: "",
  color: "",
  weight: "",
  description: "",
  photos: [],
  video: "",
  vaccinated: "",
  deworm: "",
  location: "",
  status: "Available",
}))

 function getAll({page = 1 , limit = 10, search = ""} = {}){
    return $fetch<{items:TDog[], pages:number, pageRange:string}>("/api/dog",{
        method:"GET",
        query: { page, limit, search}
    });
 }

 function getById(id:string){
    return $fetch<TDog>(`/api/dog/${id}`)
 }

 function add(data:TDog){
    return $fetch("/api/dog",{
        method:"POST",
        body:data
    })
 }

 function updateById(id:string, data:Partial<TDog>){
    return $fetch(`/api/dog/${id}`,{
        method:"PATCH",
        body:data
    })
 }

 function deleteById(id:string){
    return $fetch(`/api/dog/${id}`,{
        method:"DELETE"
    })
 }

 return {
    dogItem,
    add,
    getAll,
    getById,
    updateById,
    deleteById
 }

}