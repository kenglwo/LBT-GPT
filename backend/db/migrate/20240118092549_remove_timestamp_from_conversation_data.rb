class RemoveTimestampFromConversationData < ActiveRecord::Migration[6.1]
  def change
    remove_column :conversation_data, :timestamp, :datetime
  end
end
