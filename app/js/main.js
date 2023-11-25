const form = document.querySelector('#form')
const day = document.querySelector('#day')
const month = document.querySelector('#month')
const year = document.querySelector('#year')
const submit_btn = document.querySelector('#submit')
const years_text = document.querySelector('[data-years]')
const months_text = document.querySelector('[data-months]')
const days_text = document.querySelector('[data-days]')
const fieldsets = document.querySelectorAll('fieldset')
const inputs = document.querySelectorAll('label + input')

//Regular Expressions
const day_regex = /^([1-9]|[12][0-9]|3[01])$/
const month_regex = /^(0[1-9]|1[0-2])$/
const year_regex = /^([12][0-9]{3})$/

// Events Section
window.addEventListener('load', () => {
    day.value = month.value = year.value = ''
})

form.addEventListener('submit', e => {
    e.preventDefault()

    if(year.value.trim() === '' || month.value.trim() === '' || day.value.trim() === '' || !day_regex.test(day.value) || !month_regex.test(month.value) || !year_regex.test(year.value) || year.value > date('year')){
        show_alert();
    }else{
        calculateAge(new Date(`${year.value}-${month.value}-${day.value}`))
    }
})

inputs.forEach(input => {
    input.addEventListener('focus', () => {
        input_Clear(input)
    })
})

inputs.forEach(input => {
    input.addEventListener('input', e => {
        input_Clear(input)
        if(e.target === day && !day_regex.test(e.target.value)){
            add_alert(fieldsets[0], 'Must be a valid day')
        }else if(e.target === month && !month_regex.test(e.target.value)){
            add_alert(fieldsets[1], 'Must be a valid month')
        }else if(e.target === year && !year_regex.test(e.target.value)){
            add_alert(fieldsets[2], 'Must be a valid year')
        }else if(e.target === year && e.target.value > date('year')){
            add_alert(fieldsets[2], 'Must be in the past')
        }else{
            console.log("ALL OK 👌")
        }
    })
})


// Helper functions
function show_alert(){

    if(day.value.trim() === ''){
        console.log('day is empty')
        add_alert(fieldsets[0], "This field is required")
    }
    else if(month.value.trim() === ''){
        console.log('month is empty')
        add_alert(fieldsets[1], "This field is required")
    }
    else if(year.value.trim() === ''){
        console.log('year is empty')
        add_alert(fieldsets[2], "This field is required")
    }
    else if(!day_regex.test(day.value)){
        console.log('day is not valid')
        add_alert(fieldsets[0], "Must be a valid day")
    }
    else if(!month_regex.test(month.value)){
        console.log('month is not valid')
        add_alert(fieldsets[1], "Must be a valid month")
    }
    else if(!year_regex.test(year.value)){
        console.log('year is not valid')
        add_alert(fieldsets[2], "Must be a valid year")
    }
    else if(year.value > date('year')){
        console.log('year is greater than current year')
        add_alert(fieldsets[2], "Must be in the past")
    }

}

function calculateAge(birthDate) {
    // const now = new Date();
    let years = date('year') - birthDate.getFullYear();
    let months = date('month') - birthDate.getMonth();
    let days = date('day') - birthDate.getDate();

    if (months < 0 || (months === 0 && days < 0)) {
        years--;
        months += 12;
    }

    if (days < 0) {
        months--;
        const previousMonth = new Date(now.getFullYear(), now.getMonth(), 0);
        days += previousMonth.getDate();
    }

    years_text.innerText = years
    months_text.innerText = months
    days_text.innerText = days

    console.log('ALL OK 👌')
}

function add_alert(fieldset, message){
    const div = document.createElement('div')
    div.className = "alert block text-Light_red text-xs w-[5.5rem] md:w-full font-Pop_italic"
    div.append(message)

    fieldset.firstElementChild.classList.replace('text-Smokey_grey', 'text-Light_red')
    fieldset.lastElementChild.classList.add('mb-1')
    fieldset.lastElementChild.classList.replace('border-Light_grey', 'border-Light_red')

    fieldset.append(div)

    submit_btn.disabled = true
    submit_btn.classList.replace('top-[6.3rem]', 'top-[8.3rem]')
    submit_btn.classList.replace('md:top-[4rem]', 'md:top-[5rem]')
    submit_btn.classList.replace('cursor-pointer', 'cursor-not-allowed')
}

function input_Clear(input){
    input.previousElementSibling.classList.replace('text-Light_red','text-Smokey_grey')
    input.classList.remove('mb-1')
    input.classList.replace('border-Light_red', 'border-Light_grey')

    document.querySelector('.alert').remove()

    submit_btn.disabled = false
    submit_btn.classList.replace('top-[8.3rem]','top-[6.3rem]')
    submit_btn.classList.replace('md:top-[5rem]', 'md:top-[4rem]')
    submit_btn.classList.replace('cursor-not-allowed', 'cursor-pointer')
}

function date(type){
    const date = new Date()

    if(type === "day"){
        return date.getDate()
    }else if(type === "month"){
        return date.getMonth()
    }else{
        return date.getFullYear()
    }
}