class Dalle3ImageMapping < ActiveRecord::Migration[6.1]
  def change
    create_table :dalle3_image_mappings do |t|
      t.bigint :id_conversation_data
      t.string :image_url_local
    end
  end
end
