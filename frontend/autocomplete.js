$(function(){
    $('.searchName').autocomplete({
        source: function(req, res){
            $.ajax({
                url: "http://localhost:3000/api/airport", // Mettez le bon chemin d'accès ici
                dataType: "json",
                type:"GET",
                data:req,
                success: function (data){
                    res($.map(data, function(el){
                        return {
                            label: el.address.cityName + ' (' + el.iataCode +')',
                            value: el.iataCode
                        };
                    }));
                },
                error: function(err){
                    console.log(err.status);
                }
            });
        }
    });
});
