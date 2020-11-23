class DatesFormater
{

    dateBR(data)
    {
        var myDate = new Date( data )
        return myDate.getDate()+'/'+myDate.getMonth()+'/'+myDate.getFullYear()+' '+myDate.getHours()+':'+myDate.getMinutes()
    }

}

const datesFormater = new DatesFormater({})
export default datesFormater