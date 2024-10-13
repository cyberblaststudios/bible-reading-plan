const plan_server = origin + '/apiv1/bibleplan';

export async function getBibleReadingPlan(){
    try{
        await fetch(plan_server, {method: 'GET'}).then((response) => {
            return response.json()
        }).then((data) => {
            console.log(data)
        })

    } catch (exception) {
        console.log(exception)       
    }
}