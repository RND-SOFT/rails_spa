rails_spa.factory("pluralize", function(){     
    return function (count, variants) {
      var result;
      if (variants.length == 3) {
        if (count==1 || (count!=11 && count%100!=11 && count%10==1)) {
          result = variants[0];
        } else if ((count>=2 && count<=4) || ((count%100>20 && count>20)&&(count%10>=2 || count%10<=4))) {
          result = variants[1];
        } else {
          result = variants[2]
        }
      } else if (variants.length == 2) {
        if (count==1)
          result = variants[0];
        else
          result = variants[1];
      }
      
      return result;
    }
    
})