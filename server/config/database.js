if(process.env.NODE_ENV === 'production'){
  module.exports = {mongoURI:
    'mongodb://abobakr:abobakr@ds129706.mlab.com:29706/moviecatalogue'};
}
else{
  module.exports = {mongoURI: 'mongodb://localhost/moviecatalogue'};
}
