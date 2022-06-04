
class IncomeModule{
    showIncome(){
        const monthP = document.getElementById("p_month");
        const monthIncomeP = document.getElementById("p_month_income");
        const allIncomeP = document.getElementById("p_all_income");
        
        let promise = fetch('showIncomes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset:utf8'
            },
            credentials: 'include'
        });
        
        promise.then(responseIncomes => responseIncomes.json()).then(responseIncomes =>{
            if (responseIncomes.status) {
                monthP.innerHTML = responseIncomes.month;
                monthIncomeP.innerHTML = responseIncomes.monthIncome;
                allIncomeP.innerHTML = responseIncomes.allIncome;
            }
        }).catch(error=>{
            document.getElementById('info').innerHTML = 'Ошибка сервера showIncomes: '+error;
        });
    }
}

const incomeModule = new IncomeModule();
export {incomeModule};