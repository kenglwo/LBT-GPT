Rails.application.routes.draw do
  post 'api/save_student_data', to: 'api#save_student_data'
  get 'api/test', to: 'api#test'

end
