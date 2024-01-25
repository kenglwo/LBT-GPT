class ChangeStudentDataToStudentInfo < ActiveRecord::Migration[6.1]
  def change
    rename_table :student_data, :student_info
  end
end
