/* Your Code Here */

let employeeObj;

function createEmployeeRecord(array) {
    employeeObj = {
        "firstName": array[0],
        "familyName": array[1],
        "title": array[2],
        "payPerHour": array[3],
        "timeInEvents": [],
        "timeOutEvents": []
    }
    return employeeObj;
}

function createEmployeeRecords(arrayOfArrays) {
    let newArray = [];
    arrayOfArrays.forEach((array) => {
        newArray.push(createEmployeeRecord(array))
    })
    return newArray;

}

function createTimeInEvent(date) {
    let dateArray = date.split(' ')
    let hour = parseInt(dateArray[1], 10)
    let day = dateArray[0]
    let timeInObj = {
        "type": "TimeIn",
        "hour": hour,
        "date": day,
    }
    this.timeInEvents.push(timeInObj)
    return this;
}

function createTimeOutEvent(date) {
    let dateArray = date.split(' ')
    let hour = parseInt(dateArray[1], 10)
    let day = dateArray[0]
    let timeOutObj = {
        "type": "TimeOut",
        "hour": hour,
        "date": day
    }
    this.timeOutEvents.push(timeOutObj)
    return this;

}

function hoursWorkedOnDate(date) {
    let num;
    for (let i = 0; i < this.timeInEvents.length; i++) {
        if (this.timeInEvents[i].date === date) {
            num = this.timeOutEvents[i].hour - this.timeInEvents[i].hour
            return num / 100;
        }
    }
    return false;
}

function wagesEarnedOnDate(date) {
    let num = hoursWorkedOnDate.call(this, date)
    num = num * this.payPerHour
    return num;

}

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

function findEmployeeByFirstName(srcArray, first){
    for (let i in srcArray){
        if (srcArray[i].firstName ===first){
            return srcArray[i];
        }
    }
}


function calculatePayroll(employeeArray) {
//     let num;
//     let allWages = [];
//     employeeArray.forEach(x => allWagesFor.call(x))

//     num = allWages.reduce((accumulator, currentValue) => 
//     accumulator + currentValue,
//     0
//   )
//   return num

let num = employeeArray.reduce((m, e) => m + allWagesFor.call(e), 0)
return num;


}

