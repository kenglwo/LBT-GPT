class Dalle3ImageMappingQuiz < ActiveRecord::Migration[6.1]
  def change
    create_table :dalle3_image_mappings_quiz do |t|
      t.bigint :id_quiz_conversation_data
      t.string :image_url_local
    end
  end
end
