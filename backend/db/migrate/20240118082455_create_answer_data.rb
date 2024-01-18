class CreateAnswerData < ActiveRecord::Migration[6.1]
  def change
    create_table :answer_data do |t|
      t.string :student_id
      t.string :question_id
      t.text :answer
      t.datetime :timestamp

      t.timestamps
    end
  end
end
