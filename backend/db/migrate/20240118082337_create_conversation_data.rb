class CreateConversationData < ActiveRecord::Migration[6.1]
  def change
    create_table :conversation_data do |t|
      t.string :student_id
      t.string :role
      t.text :prompt
      t.datetime :timestamp

      t.timestamps
    end
  end
end
