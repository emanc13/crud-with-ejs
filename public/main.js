var update = document.getElementById('update')
var del = document.getElementById('delete')

update.addEventListener('click', function () {
    fetch('data', {
        method: 'put',    
        headers: {'Content-Type': 'application/json'},    
        body: JSON.stringify({    
          'name': 'replaced',    
          'data': 'replaced'    
        })
    })
    
    .then(response => {
        if (response.ok) return response.json()
      })
      .then(data => {
        console.log(data)    
      })
    })
    
del.addEventListener('click', function () {
  fetch('data', {
    method: 'delete',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      'name': 'deleted',
      'data': 'deleted'
    })

  }).then(function (response) {
    window.location.reload()
  })
 })

