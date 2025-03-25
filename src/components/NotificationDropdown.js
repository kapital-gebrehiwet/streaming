import React from 'react';
import { BsDot } from 'react-icons/bs';
import { formatDistanceToNow } from 'date-fns';
import Image from 'next/image';

const NotificationDropdown = ({ notifications, onMarkAsRead, onClearAll }) => {
  return (
    <div className="absolute right-0 mt-2 w-80 bg-black/95 rounded-md shadow-lg overflow-hidden z-50">
      <div className="p-4 border-b border-gray-800">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold text-white">Notifications</h3>
          <button
            onClick={onClearAll}
            className="text-sm text-gray-400 hover:text-white transition"
          >
            Clear all
          </button>
        </div>
      </div>

      <div className="max-h-96 overflow-y-auto">
        {notifications.length === 0 ? (
          <div className="p-4 text-center text-gray-400">
            No new notifications
          </div>
        ) : (
          notifications.map((notification) => (
            <div
              key={notification.id}
              className={`p-4 hover:bg-gray-800/50 transition-colors ${
                !notification.read ? 'bg-gray-800/20' : ''
              }`}
              onClick={() => onMarkAsRead(notification.id)}
            >
              <div className="flex items-start space-x-3">
                {notification.image && (
                  <div className="relative w-12 h-16 flex-shrink-0">
                    <Image
                      src={notification.image}
                      alt=""
                      layout="fill"
                      objectFit="cover"
                      className="rounded"
                    />
                  </div>
                )}
                <div className="flex-1">
                  <p className="text-sm text-white">
                    {!notification.read && (
                      <BsDot className="inline-block text-primary-500 text-xl" />
                    )}
                    {notification.message}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    {formatDistanceToNow(new Date(notification.timestamp), { addSuffix: true })}
                  </p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default NotificationDropdown; 