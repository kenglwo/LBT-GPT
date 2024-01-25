class CreateQuizConversationData < ActiveRecord::Migration[6.1]
  def change
    create_table :quiz_conversation_data do |t|
      t.string :student_id
      t.string :role
      t.text :prompt

      t.timestamps
    end
  end
end
