Rails.application.routes.draw do
  post 'api/save_student_data', to: 'api#save_student_data'
  post 'api/save_student_info', to: 'api#save_student_info'
  get 'api/test', to: 'api#test'

end
