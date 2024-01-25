class CreateStudentData < ActiveRecord::Migration[6.1]
  def change
    create_table :student_data do |t|
      t.string :student_id
      t.string :student_name

      t.timestamps
    end
  end
end
